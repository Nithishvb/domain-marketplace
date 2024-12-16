import userMiddleware from "../../middlewares/user";
import { createDomainListing, deleteDomainListing, domainList, searchDomains, updateDomainListing } from "../../controllers/Domains.controller";
import { Router } from "express";

export const domainRouter = Router();
domainRouter.use(userMiddleware);

domainRouter.get("/", domainList);
domainRouter.get("/search", searchDomains);
domainRouter.post("/new", createDomainListing);
domainRouter.put("/:id", updateDomainListing);
domainRouter.delete("/:id", deleteDomainListing);
