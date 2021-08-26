'use strict';

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require('lodash');
const AWS = require('aws-sdk');
const ACL = [
  "private",
  "public-read",
  "public-read-write",
  "authenticated-read",
  "bucket-owner-read",
  "bucket-owner-full-control",
];

const validateAccessLevel = (config) => {
  if (config.acl) {
    if (ACL.includes(config.acl)) {
      return config.acl
    }
    throw Error(
      `The object access level: ${config.acl} is not valid. Please choose from: ${ACL}`
    );

  }
  // default access level
  return 'public-read'
}

module.exports = {
  init(config) {
    const S3 = new AWS.S3({
      apiVersion: '2006-03-01',
      ...config,
    });

    return {
      upload(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          const pathPrefix = config.pathPrefix.trim !== "/" ? config.pathPrefix.trim() : '';
          const filePath = `${pathPrefix}${path}${file.hash}${file.ext}`;
          S3.upload(
            {
              Key: filePath,
              Body: Buffer.from(file.buffer, 'binary'),
              ACL: validateAccessLevel(config),
              ContentType: file.mime,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              // set the bucket file url
              if (config.customDomain && config.customDomain.trim() !== '') {
                file.url = `${config.customDomain.trim()}/${filePath}`
              } else {
                file.url = data.Location;
              }

              resolve();
            }
          );
        });
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          const pathPrefix = config.pathPrefix.trim !== "/" ? config.pathPrefix.trim() : '';
          S3.deleteObject(
            {
              Key: `${pathPrefix}${path}${file.hash}${file.ext}`,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });
      },
    };
  },
};
