-- dbo.invoiceheader definition

-- Drop table

-- DROP TABLE dbo.invoiceheader;

CREATE TABLE dbo.invoiceheader (
	id varchar NOT NULL DEFAULT gen_random_uuid(),
	"date" timestamp NOT NULL DEFAULT now(),
	invoicenumber int8 NOT NULL,
	customername varchar NULL,
	billingaddress varchar NULL,
	shippingaddress varchar NULL,
	gstin varchar NULL,
	totalamount numeric(10, 2) NOT NULL DEFAULT 0,
	CONSTRAINT invoiceheader_pkey PRIMARY KEY (id)
);

-- dbo.invoicebillsundry definition

-- Drop table

-- DROP TABLE dbo.invoicebillsundry;

CREATE TABLE dbo.invoicebillsundry (
	id varchar NOT NULL DEFAULT gen_random_uuid(),
	billsundryname varchar NOT NULL,
	amount numeric(10, 2) NOT NULL DEFAULT 0,
	invoiceid varchar NOT NULL,
	CONSTRAINT invoicebillsundry_pkey PRIMARY KEY (id),
	CONSTRAINT invoicebillsundry_invoiceheader_fk FOREIGN KEY (id) REFERENCES dbo.invoiceheader(id)
);

-- dbo.invoiceitems definition

-- Drop table

-- DROP TABLE dbo.invoiceitems;

CREATE TABLE dbo.invoiceitems (
	id varchar NOT NULL DEFAULT gen_random_uuid(),
	itemname varchar NOT NULL,
	quantity numeric(10, 2) NOT NULL DEFAULT 0,
	price numeric(10, 2) NOT NULL DEFAULT 0,
	amount numeric(10, 2) NOT NULL DEFAULT 0,
	invoiceid varchar NOT NULL,
	CONSTRAINT invoiceitems_pkey PRIMARY KEY (id),
	CONSTRAINT invoiceitems_invoiceheader_fk FOREIGN KEY (id) REFERENCES dbo.invoiceheader(id)
);