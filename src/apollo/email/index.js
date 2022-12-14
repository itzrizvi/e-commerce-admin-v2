import { gql } from '@apollo/client';

export const EmailTemplateQuery = {
  GET_EMAIL_HEADER_FOOTER_LIST: gql`
    query getEmailTempHeaderFooterList {
      getEmailTempHeaderFooterList {
        message
        status
        data {
          id
          name
          slug
          content
          type
          createdAt
          updatedAt
        }
      }
    }
  `,
  ADD_EMAIL_TEMPLATE_HEADER_FOOTER: gql`
    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {
      addEmailTempHeaderFooter(data: $data) {
        message
        status
      }
    }
  `,
  SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER: gql`
    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {
      getSingleEmailTempHeaderFooter(query: $query) {
        message
        status
        data {
          id
          name
          slug
          content
          layout_type
          type
          createdAt
          updatedAt
        }
      }
    }
  `,
  EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE: gql`
    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {
      updateEmailTempHeaderFooter(data: $data) {
        message
        status
      }
    }
  `,
  GET_EMAIL_TEMPLATE_LIST: gql`
    query getAllEmailTemplateList {
      getAllEmailTemplateList {
        message
        status
        data {
          id
          email_template_id
          name
          slug
          createdAt
          updatedAt
        }
      }
    }
  `,
  ADD_EMAIL_TEMPLATE_LIST: gql`
    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {
      addEmailTemplateOnList(data: $data) {
        message
        status
      }
    }
  `,
  SINGLE_EMAIL_TEMPLATE_LIST: gql`
    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {
      getSingleEmailTemplateList(query: $query) {
        message
        status
        data {
          id
          email_template_id
          name
          slug
          createdAt
          updatedAt
        }
      }
    }
  `,
  UPDATE_EMAIL_TEMPLATE_LIST: gql`
    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {
      updateEmailTemplateOnList(data: $data) {
        message
        status
      }
    }
  `,
  CREATE_EMAIL_TEMPLATE: gql`
    mutation createEmailTemplate($data: addEmailTemplateInput) {
      createEmailTemplate(data: $data) {
        message
        status
      }
    }
  `,
  GET_EMAIL_TEMPLATE_CONTENT_LIST: gql`
    query getEmailTemplateList {
      getEmailTemplateList {
        message
        status
        data {
          id
          name
          slug
          createdAt
          updatedAt
          emailHeader {
            id
            name
            slug
          }
          emailFooter {
            id
            name
            slug
          }
        }
      }
    }
  `,
  GET_SINGLE_EMAIL_CONTENT_TEMPLATE: gql`
    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {
      getSingleEmailTemplate(query: $query) {
        message
        status
        data {
          id
          name
          slug
          content
          layout_type
          createdAt
          updatedAt
          emailHeader {
            id
            name
            slug
            content
            type
            createdAt
            updatedAt
          }
          emailFooter {
            id
            name
            slug
            content
            type
            createdAt
            updatedAt
          }
        }
      }
    }
  `,
  UPDATE_EMAIL_TEMPLATE_CONTENT: gql`
    mutation updateEmailTemplate($data: updateEmailTemplateInput) {
      updateEmailTemplate(data: $data) {
        message
        status
      }
    }
  `,
  GET_EMAIL_TEMPLATE_PREVIEW: gql`
    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {
      getEmailTemplatePreview(query: $query) {
        message
        status
        tenant_id
        data
      }
    }
  `,
};
