import { createDomainListing, deleteDomainListing, domainList, updateDomainListing } from "../../controllers/Domains.controller";
import { Router } from "express";

export const domainRouter = Router();

domainRouter.get("/", domainList);
domainRouter.post("/new", createDomainListing);
domainRouter.put("/:id", updateDomainListing);
domainRouter.delete("/:id", deleteDomainListing);
