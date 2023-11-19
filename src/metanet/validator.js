import Joi from 'joi';

class MetanetValidator {
    constructor() {}

    async createMetanetNode(opts) {
        const schema = Joi.object({
            nodeName: Joi.string().required(),
            parentTxID: Joi.string().required(),
            parentSignature: Joi.string().required(),
        });

        await schema.validateAsync(opts);
    }
    async getMetanetNode(opts) {
        const schema = Joi.object({
            nodeTxID: Joi.string().required(),
        });

        await schema.validateAsync(opts);
    }

    async deleteMetanetNode(opts) {
        const schema = Joi.object({
            nodeTxID: Joi.string().required(),
        });

        await schema.validateAsync(opts);
    }

    async listMetanetNodes(opts) {
        const schema = Joi.object({
            domain: Joi.string().required(),
        });

        await schema.validateAsync(opts);
    }

    async findAllDescendants(opts) {
        const schema = Joi.object({
            nodeTxID: Joi.string().required(),
        });

        await schema.validateAsync(opts);
    }

    async findAllAncestors(opts) {
        const schema = Joi.object({
            nodeTxID: Joi.string().required(),
        });

        await schema.validateAsync(opts);
    }

    async transferOwnership(opts) {
        const schema = Joi.object({
            nodeTxID: Joi.string().required(),
            newOwnerPublicKey: Joi.string().required(),
        });

        await schema.validateAsync(opts);
    }

    // Add more validation methods for other Metanet-related actions as needed.
}
export default MetanetValidator;




    

