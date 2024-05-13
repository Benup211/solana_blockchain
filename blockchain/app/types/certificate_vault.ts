/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/certificate_vault.json`.
 */
export type CertificateVault = {
  "address": "4Z4fnLEkQ1FkzGxjfGDKR5AKAQQAHqBf53BZJ1bfV2XC",
  "metadata": {
    "name": "certificateVault",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "getAllData",
      "discriminator": [
        123,
        176,
        254,
        135,
        24,
        71,
        65,
        169
      ],
      "accounts": [
        {
          "name": "passportData",
          "writable": true
        },
        {
          "name": "user",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "getId",
      "discriminator": [
        176,
        193,
        97,
        9,
        60,
        181,
        41,
        130
      ],
      "accounts": [
        {
          "name": "passportData",
          "writable": true
        },
        {
          "name": "user",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "passportNumber",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "passportData",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "passportNumber",
          "type": "string"
        },
        {
          "name": "surname",
          "type": "string"
        },
        {
          "name": "givenNames",
          "type": "string"
        },
        {
          "name": "nationality",
          "type": "string"
        },
        {
          "name": "sex",
          "type": "string"
        },
        {
          "name": "dateOfBirth",
          "type": "string"
        },
        {
          "name": "dateOfIssue",
          "type": "string"
        },
        {
          "name": "dateOfExpiry",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "passportData",
      "discriminator": [
        170,
        47,
        123,
        204,
        13,
        253,
        244,
        33
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "notFound",
      "msg": "Given Id not Found"
    }
  ],
  "types": [
    {
      "name": "passportData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "passportNumber",
            "type": "string"
          },
          {
            "name": "surname",
            "type": "string"
          },
          {
            "name": "givenNames",
            "type": "string"
          },
          {
            "name": "nationality",
            "type": "string"
          },
          {
            "name": "sex",
            "type": "string"
          },
          {
            "name": "dateOfBirth",
            "type": "string"
          },
          {
            "name": "dateOfIssue",
            "type": "string"
          },
          {
            "name": "dateOfExpiry",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
