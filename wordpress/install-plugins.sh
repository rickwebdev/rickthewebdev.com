#!/bin/bash

# Download WordPress core
wp core download --allow-root

# Create wp-config.php
wp config create --dbname=wordpress --dbuser=wordpress --dbpass=wordpress --dbhost=db:3306 --allow-root

# Install WordPress
wp core install --url="http://localhost:8085" --title="My WordPress Site" --admin_user=admin --admin_password=admin --admin_email=admin@example.com --skip-email --allow-root

# Install and activate plugins
wp plugin install wp-gatsby --activate --allow-root
wp plugin install wp-rest-api-v2 --activate --allow-root
wp plugin install acf-to-rest-api --activate --allow-root
wp plugin install disable-gutenberg --activate --allow-root
wp plugin install advanced-custom-fields --activate --allow-root

# Create Portfolio category
wp term create category portfolio --name="Portfolio" --slug="portfolio" --allow-root

# Create Portfolio Item custom post type
wp post-type create portfolio-item --label="Portfolio Items" --singular-label="Portfolio Item" --public=true --has-archive=true --menu-icon="dashicons-portfolio" --allow-root

# Create ACF field group for portfolio items
wp acf add-field-group portfolio-fields --title="Portfolio Fields" --post-type=portfolio-item --fields="
    {
        "key": "field_portfolio_title",
        "label": "Title",
        "name": "portfolio_title",
        "type": "text",
        "required": 1
    },
    {
        "key": "field_portfolio_description",
        "label": "Description",
        "name": "portfolio_description",
        "type": "wysiwyg"
    },
    {
        "key": "field_portfolio_image",
        "label": "Featured Image",
        "name": "portfolio_image",
        "type": "image",
        "return_format": "array"
    },
    {
        "key": "field_portfolio_link",
        "label": "Project Link",
        "name": "portfolio_link",
        "type": "url"
    },
    {
        "key": "field_portfolio_tags",
        "label": "Tags",
        "name": "portfolio_tags",
        "type": "taxonomy",
        "taxonomy": "post_tag"
    }" --allow-root

echo "All plugins installed and configured successfully!"
