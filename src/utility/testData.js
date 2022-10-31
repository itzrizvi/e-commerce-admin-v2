export const dummySingleProduct = {
    prod_uuid: "c5c2a344-f58f-4231-8687-40f427b32973",
    prod_name: "with gal",
    prod_slug: "with-gal",
    prod_long_desc: "<p>lg des</p>",
    prod_short_desc: "short des",
    prod_meta_title: "m t",
    prod_meta_desc: "md",
    prod_meta_keywords: "m1,m2,m3",
    prod_tags: "red, green",
    prod_regular_price: 5,
    prod_sale_price: 2,
    prod_partnum: "with-gal",
    prod_sku: "with-gal",
    prod_status: true,
    taxable: true,
    prod_weight: "2",
    prod_weight_class: "Pound",
    prod_outofstock_status: "In Stock",
    prod_thumbnail: "c5c2a344-f58f-4231-8687-40f427b32973.jpg",
    tenant_id: "100001",
    createdAt: "1667070525539",
    updatedAt: "1667070525733",
    brand: {
        brand_uuid: "e3a6e14a-27ee-44d0-b8a7-dc49cebe7c44",
        brand_name: "Abraham Mcfadden",
        brand_slug: "abraham-mcfadden",
        brand_description: "Quia voluptate nisi ",
        brand_status: true,
        brand_sort_order: 0,
        image: "e3a6e14a-27ee-44d0-b8a7-dc49cebe7c44.jpg",
        __typename: "Brand"
    },
    category: {
        cat_id: "84b1e480-90e6-4753-bddf-8719b2e1f482",
        cat_name: "Backplane Cable",
        cat_slug: "backplane-cable",
        cat_description: "Category Demo Description",
        cat_meta_tag_title: "Category Demo Meta Tag Title",
        cat_meta_tag_description: "Category Demo Meta Tag Description",
        cat_meta_tag_keywords: "keyword1,keyword2,keyword3,keyword4",
        image: null,
        cat_sort_order: 0,
        cat_status: true,
        is_featured: false,
        tenant_id: "100001",
        cat_parent_id: "e3a7a796-8506-4e87-a430-300b057453f0",
        __typename: "Category"
    },
    discount_type: [
        {
            discount_type_uuid: "e370e1dd-ceb8-4536-8bd2-9e45847a563e",
            customer_group: {
                customer_group_uuid: "7856b8e9-9b96-4818-9613-e26580d85916",
                customer_group_name: "Facebook Customers",
                customer_group_slug: "facebook-customers",
                customergroup_description: "Demo Description",
                customergroup_sortorder: 1,
                customergroup_status: true,
                __typename: "CustomerGroup"
            },
            discount_quantity: 3,
            discount_priority: 3,
            discount_price: 2,
            discount_startdate: "1666120051000",
            discount_enddate: "1665428853000",
            __typename: "DiscountType"
        }
    ],
    dimensions: {
        prod_dimension_uuid: "5e2b4f79-dccf-417f-ae95-e2d9bd58d523",
        length: "2",
        width: "3",
        height: "2",
        dimension_class: "Inch",
        __typename: "ProductDimension"
    },
    gallery: [
        {
            prod_gallery_uuid: "d7ffc90e-49d7-4766-afe0-e4b61fc3af4a",
            prod_uuid: "c5c2a344-f58f-4231-8687-40f427b32973",
            prod_image: "c5c2a344-f58f-4231-8687-40f427b32973-1667070525756.jpg",
            __typename: "ProductGallery"
        },
        {
            prod_gallery_uuid: "b98bf38d-3d6b-4f6f-8b74-f03175c89127",
            prod_uuid: "c5c2a344-f58f-4231-8687-40f427b32973",
            prod_image: "c5c2a344-f58f-4231-8687-40f427b32973-1667070525842.jpg",
            __typename: "ProductGallery"
        }
    ],
    part_of_products: [
        {
            partof_product_uuid: "8284e4b7-89a3-4664-a4d6-4da0d004c5d9",
            prod_quantity: 1,
            part_product: {
                prod_uuid: "a61ce22b-fc7b-4df5-80bf-9d0231de83c5",
                prod_name: "Nyssa Miles",
                prod_slug: "nyssa-miles",
                prod_long_desc: "<h1><br></h1>",
                prod_short_desc: "Irure nihil anim ani",
                prod_meta_title: "Consequatur minim d",
                prod_meta_desc: "Consequatur aut cupi",
                prod_meta_keywords: "Sit eum est in aperi",
                prod_tags: "Nam pariatur Conseq",
                prod_regular_price: 961,
                prod_sale_price: 92,
                prod_partnum: "Ducimus exercitatio",
                prod_sku: "Ea magnam fugiat au",
                prod_status: true,
                taxable: true,
                prod_weight: null,
                prod_weight_class: null,
                prod_outofstock_status: "In Stock",
                prod_thumbnail: "Ea magnam fugiat au.jpg",
                __typename: "Product"
            },
            __typename: "PartofProduct"
        },
        {
            partof_product_uuid: "5d9ac177-8206-421e-9507-3b04152828fa",
            prod_quantity: 1,
            part_product: {
                prod_uuid: "097781de-5297-4c0d-bdee-0bf70bbe2efe",
                prod_name: "NEW PRODUCT",
                prod_slug: "new-product",
                prod_long_desc: "Demo Long Description",
                prod_short_desc: "Demo Short Description",
                prod_meta_title: "Meta Title",
                prod_meta_desc: "Meta Description",
                prod_meta_keywords: "keyword1,keyword2,keyword2",
                prod_tags: "tag1,tag2,tag2",
                prod_regular_price: 50.96,
                prod_sale_price: 50,
                prod_partnum: "NP1294982",
                prod_sku: "998260",
                prod_status: true,
                taxable: true,
                prod_weight: "1",
                prod_weight_class: "Kilogram",
                prod_outofstock_status: "In Stock",
                prod_thumbnail: "998260.jpg",
                __typename: "Product"
            },
            __typename: "PartofProduct"
        }
    ],
    prod_attributes: [
        {
            prod_attr_uuid: "0ac4c9d1-0090-4778-a138-50f69bc2bc2b",
            attribute_type: "none",
            attribute_value: "none",
            attribute_data: {
                attribute_uuid: "403343b6-46a0-401f-bd0a-9b8c64aa2c53",
                attribute_name: "ag2",
                attribute_slug: "ag2",
                attribute_status: true,
                attribute_group: {
                    attr_group_uuid: "7d28d2dd-f9e3-46ae-bf16-ca77ad12dd81",
                    attr_group_name: "Test",
                    attr_group_slug: "test",
                    attrgroup_sortorder: null,
                    attrgroup_status: true,
                    __typename: "AttributeGroup"
                },
                __typename: "Attribute"
            },
            __typename: "ProductAttributes"
        },
        {
            prod_attr_uuid: "0a40d5d4-0835-4c5b-8359-5b69a00cf81c",
            attribute_type: "text",
            attribute_value: "t1",
            attribute_data: {
                attribute_uuid: "7a9486cf-ad91-40df-940f-c6dc8d83cae5",
                attribute_name: "t111",
                attribute_slug: "t111",
                attribute_status: true,
                attribute_group: {
                    attr_group_uuid: "4e379d73-d134-4d4e-a221-0757151a5b4a",
                    attr_group_name: "group 2",
                    attr_group_slug: "group-2",
                    attrgroup_sortorder: null,
                    attrgroup_status: true,
                    __typename: "AttributeGroup"
                },
                __typename: "Attribute"
            },
            __typename: "ProductAttributes"
        }
    ],
    related_products: [
        {
            related_prod_uuid: "76c42a59-57c7-4afa-9ca0-480bd3693944",
            related_prod: {
                prod_uuid: "a61ce22b-fc7b-4df5-80bf-9d0231de83c5",
                prod_name: "Nyssa Miles",
                prod_slug: "nyssa-miles",
                prod_long_desc: "<h1><br></h1>",
                prod_short_desc: "Irure nihil anim ani",
                prod_meta_title: "Consequatur minim d",
                prod_meta_desc: "Consequatur aut cupi",
                prod_meta_keywords: "Sit eum est in aperi",
                prod_tags: "Nam pariatur Conseq",
                prod_regular_price: 961,
                prod_sale_price: 92,
                prod_partnum: "Ducimus exercitatio",
                prod_sku: "Ea magnam fugiat au",
                prod_status: true,
                taxable: true,
                prod_weight: null,
                prod_weight_class: null,
                prod_outofstock_status: "In Stock",
                prod_thumbnail: "Ea magnam fugiat au.jpg",
                __typename: "Product"
            },
            __typename: "RelatedProduct"
        }
    ],
    created_by: {
        uid: "88d9b801-649f-4894-9b24-d82db38b5e5d",
        first_name: "Shahriar",
        last_name: "Rizvi",
        email: "shahriar.rizvi02@gmail.com",
        image: null,
        roles: [
            {
                role_uuid: "c195cb11-a24c-49f9-b5c2-9e0ba736dfc8",
                role_no: 1663700134257,
                role: "System Admin",
                role_slug: "system-admin",
                role_status: true,
                role_description: "Demo Description",
                __typename: "Role"
            },
            {
                role_uuid: "0ab0bef3-08ac-4da1-8c08-954553e8f4e9",
                role_no: 1666891654799,
                role: "IT Admin",
                role_slug: "it-admin",
                role_status: true,
                role_description: "IT Admin can do all the Tech related tasks",
                __typename: "Role"
            }
        ],
        __typename: "Staff"
    },
    __typename: "Product"
} 