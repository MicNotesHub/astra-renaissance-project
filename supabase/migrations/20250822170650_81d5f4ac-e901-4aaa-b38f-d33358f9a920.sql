-- Update the representatives table to store just the filename instead of full URL
ALTER TABLE representatives RENAME COLUMN url TO image_filename;