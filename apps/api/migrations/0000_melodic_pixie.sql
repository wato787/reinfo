CREATE TABLE `candidates` (
	`id` text PRIMARY KEY NOT NULL,
	`address` text,
	`latitude` real,
	`longitude` real,
	`land_area_square_meters` real,
	`listing_price_yen` integer,
	`listing_url` text,
	`note` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
