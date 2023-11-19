const {expect} = require('chai');
const validator = require('../src/Pay/validator'); // Update the path accordingly
const Joi = require('joi');

describe('Validator', () => {
  describe('txMultipayc', () => {
    it('should validate options for a multiple payment channel transaction', async () => {
      const validOptions = {
        walletID: 'wallet123',
        input: [
          {sequenceNum: 1, utxoId: 123},
          {sequenceNum: 2, utxoId: 456},
        ],
        lockTime: '2022-01-01T12:00:00Z',
        outputs: [
          {amount: 100, asm: 'OP_2 OP_2 OP_ADD OP_EQUAL'},
          {amount: 200, asm: 'OP_1 OP_2 OP_ADD OP_EQUAL'},
        ],
        changeAddress: 'change123',
      };
      try {
        await validator.txMultipayc(validOptions);
      } catch (error) {
        // If validation fails, an exception will be thrown
        throw new Error('Validation should not fail');
      }
    });

    it('should throw an error for invalid options', async () => {
      // Example invalid options (missing required fields)
      const invalidOptions = {
        input: [
          {sequenceNum: 1, utxoId: 123},
        ],
        outputs: [
          {amount: 100, asm: 'OP_2 OP_2 OP_ADD OP_EQUAL'},
        ],
      };
      try {
        await validator.txMultipayc(invalidOptions).then((res) =>{}).catch((obj) => {
          throw new Error('Validation should fail');
        });
      } catch (error) {
        expect(error).to.be.an.instanceOf(Joi.ValidationError);
      }
    });
  });
});

// Add tests for Metanet-specific validations
describe('Metanet', () => {
  it('should validate options for creating a Metanet node', async () => {
      const validMetanetOptions = {
          // Your valid Metanet creation options here
      };
      try {
          await metanetValidator.createMetanetNode(validMetanetOptions);
      } catch (error) {
          throw new Error('Metanet validation should not fail');
      }
  });

  it('should throw an error for invalid Metanet options', async () => {
      const invalidMetanetOptions = {
          // Your invalid Metanet options here
      };
      try {
          await metanetValidator.createMetanetNode(invalidMetanetOptions).then((res) => { }).catch((obj) => {
              throw new Error('Metanet validation should fail');
          });
      } catch (error) {
          expect(error).to.be.an.instanceOf(Joi.ValidationError);
      }
  });

  // Add more Metanet-specific validation tests as needed
});

