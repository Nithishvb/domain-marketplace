import { Request, Response } from "express";
import { DomainListingSchema, DomainListQuerySchema, SearchDomainsSchema, VerifyDomainSchema } from "../types/index";
import { prisma } from "@repo/db/src/index";
import { generateRandomSHA256Hash } from "../utils/verficiationCode";
import { verifyDNSOwnership } from "../utils/verifyDomain";

export const domainList = async (req: Request, res: Response) => {
  try {
    const parsedData = DomainListQuerySchema.safeParse(req.query);
    if (!parsedData.success) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: parsedData.error });
      return;
    }

    const {
      domainName,
      status,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = parsedData.data;

    const pageNumber = page;
    const pageSize = limit;
    const skip = (pageNumber - 1) * pageSize;

    const filters: any = {};

    if (domainName) {
      filters.domainName = {
        contains: domainName as string,
        mode: "insensitive",
      };
    }

    if (status) {
      filters.status = status;
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) {
        filters.price.gte = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        filters.price.lte = parseFloat(maxPrice as string);
      }
    }

    const domainsList = await prisma.domain.findMany({
      where: filters,
      skip,
      take: pageSize,
      orderBy: {
        [sortBy]: sortOrder,
      }
    });

    const totalDomains = await prisma.domain.count({ where: filters });

    res.json({
      domains: domainsList,
      count: domainsList.length,
      total: totalDomains,
      page: pageNumber,
      pages: Math.ceil(totalDomains / pageSize),
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
    return;
  }
};

export const createDomainListing = async (req: Request, res: Response) => {
  const parsedData = DomainListingSchema.safeParse(req.body);
  if (!parsedData.success) {
    res
      .status(400)
      .json({ message: "Validation failed", errors: parsedData.error });
    return;
  }

  const { domainName, description, price } = parsedData.data;

  try {
    const domain = await prisma.domain.create({
      data: {
        domainName,
        description: description || "",
        price,
        ownerId: req.userId || 1,
      },
    });

    const verficiationCode = generateRandomSHA256Hash();

    await saveDnsVerificationToken(domainName, verficiationCode, req.userId || 1);

    res.json({
      data: domain,
      verificationCode: verficiationCode
    });
    return;
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};

export const updateDomainListing = async (req: Request, res: Response) => {
  const { domainName, description, price } = req.body;
  const { id: domainId } = req.params;
  const sellerId = req.userId || 1;

  const parsedData = DomainListingSchema.safeParse(req.body);
  if (!parsedData.success) {
    res
      .status(400)
      .json({ message: "Validation failed", errors: parsedData.error });
    return;
  }

  try {
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
    });

    if (!domain) {
      res.status(404).json({ message: "Domain not found" });
      return;
    }

    if (domain.ownerId !== sellerId) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this listing" });
      return;
    }

    const updateDomain = await prisma.domain.update({
      where: { id: parseInt(domainId) },
      data: {
        domainName,
        description,
        price,
      },
    });

    res.json({
      data: updateDomain,
    });
    return;
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};

export const deleteDomainListing = async (req: Request, res: Response) => {
  const { id: domainId } = req.params;
  const sellerId = req.userId || 1;

  try {
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
    });

    if (!domain) {
      res.status(404).json({ message: "Domain not found" });
      return;
    }

    if (domain.ownerId !== sellerId) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this listing" });
      return;
    }

    const deleteDomain = await prisma.domain.delete({
      where: { id: parseInt(domainId) },
    });

    res.json({
      data: deleteDomain,
    });
    return;
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};

export const searchDomains = async (req: Request, res: Response) => {

  const parsedQuery = SearchDomainsSchema.safeParse(req.query);

  if (!parsedQuery.success) {
    res.status(400).json({
      message: "Invalid query parameters",
      errors: parsedQuery.error.format(),
    });
    return;
  }

  const { domainName } = parsedQuery.data;

  try {
    const domain = await prisma.domain.findMany({
      where: domainName
        ? { domainName: { contains: domainName, mode: "insensitive" } }
        : {},
    });

    res.json({
      data: domain,
      count: domain.length
    });
    return;
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};

export const verifyDomain = async (req: Request, res: Response) => {  
  try{
    const parsedData = VerifyDomainSchema.safeParse(req.body);
    if (!parsedData.success) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: parsedData.error.errors });
      return;
    };

    const { domain } = parsedData.data;
    const sellerId = req.userId || 1; 

    const verificationRecord = await prisma.domainVerification.findFirst({
      where: {
        domain,
        userId: sellerId,
        isVerified: false,
      },
    });

    if (!verificationRecord) {
      res.status(404).json({ message: "Verification record not found or already verified" });
      return;
    }

    const isVerified = await verifyDNSOwnership(domain, verificationRecord.verificationCode);

    if (!isVerified) {
      res.status(400).json({
        message: "Verification failed. We couldn't find the TXT record or it may be incorrect. Please double-check your DNS settings and try verifying again after a few minutes",
      });
      return;
    };

    await prisma.domainVerification.update({
      where: { id: verificationRecord.id },
      data: { isVerified: true },
    });

    res.status(200).json({
      message: "Domain ownership verified successfully!",
      domain: domain,
    });
    return;
    
  }catch(error){
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
}

const saveDnsVerificationToken = async (domainName: string, verficiationCode: string, ownerId: number) => {
  try{
    await prisma.domainVerification.create({
      data: {
        domain: domainName,
        verificationCode: verficiationCode,
        userId: ownerId
      }
    });
  }catch(err){
    return err;
  }
}