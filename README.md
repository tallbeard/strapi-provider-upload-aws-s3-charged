# strapi-provider-upload-aws-s3-charged

## Resources

- [LICENSE](LICENSE)

## Links

- [Strapi website](https://strapi.io/)
- [Strapi documentation](https://docs.strapi.io)
- [Strapi community on Discord](https://discord.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Installation

```bash
# using yarn
yarn add @strapi/provider-upload-aws-s3-charged

# using npm
npm install @strapi/provider-upload-aws-s3-charged --save
```

## Configurations

Your configuration is passed down to the provider. (e.g: `new AWS.S3(config)`). You can see the complete list of options [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)

See the [using a provider](https://docs.strapi.io/developer-docs/latest/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html#environment-variables) for setting and using environment variables in your configs.

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: env('AWS_REGION'),
      acl: env('AWS_ACL'), // one of ["private", "public-read", "public-read-write", "authenticated-read", "bucket-owner-read", "bucket-owner-full-control"]
      customDomain: env('CUSTOM_DOMAIN'),
      pathPrefix: env('UPLOAD_FOLDER'), // with trailing slash
      params: {
        Bucket: env('AWS_BUCKET'),
      },
    },
  },
  // ...
});
```

## Required AWS Policy Actions
These are the minimum amount of permissions needed for this provider to work. 
```json
"Action": [
  "s3:PutObject",
  "s3:GetObject",
  "s3:ListBucket",
  "s3:DeleteObject",
  "s3:PutObjectAcl"
],
```
