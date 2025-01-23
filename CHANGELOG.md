# Changelog

## [1.1.0] - 2025-01-23
### Added
- Added changelog file.

### Changed
- Updated README.md with a new guide link to install Node.js.
- Updated package.json with new dependencies; removed https dependency because it is now included in Node.js.
- Updated the script to use new csv-parse 5.6.0. 
- Updated .gitignore to exclude PhpStorm files.
- Updated the default `italian_municipalities.csv`.
- CSV files are now generated in UTF-8 BOM encoding.

## [1.0.0] - 2021-09-22
### Added
- Initial release.
- Functionality to download CSV from ISTAT permalink.
- Parsing and processing of CSV data to extract municipality and province information.
- Saving processed data to `italian_municipalities.csv` and `italian_provinces.csv`.