-- Table: public.company

-- DROP TABLE IF EXISTS public.company;

CREATE TABLE IF NOT EXISTS public.company
(
    companyid bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    companycode character varying(20) COLLATE pg_catalog."default" NOT NULL,
    companyname character varying(200) COLLATE pg_catalog."default" NOT NULL,
    companyaddress character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    companycountryid bigint NOT NULL,
    companyregionid bigint NOT NULL,
    website character varying(100) COLLATE pg_catalog."default",
    contactpersonname character varying(100) COLLATE pg_catalog."default",
    contactpersonemail character varying(100) COLLATE pg_catalog."default",
    currency character varying(50) COLLATE pg_catalog."default" NOT NULL,
    companylogourl character varying(1000) COLLATE pg_catalog."default",
    pan character varying(20) COLLATE pg_catalog."default",
    taxidentificationnumbertype character varying(500) COLLATE pg_catalog."default",
    taxidentificationnumber character varying(50) COLLATE pg_catalog."default",
    created_by bigint NOT NULL,
    created_date timestamp without time zone NOT NULL,
    modified_by bigint NOT NULL,
    modified_date timestamp without time zone NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    CONSTRAINT companyid_pkey PRIMARY KEY (companyid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.company
    OWNER to postgres;