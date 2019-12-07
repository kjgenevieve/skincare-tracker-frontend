import React, { Component } from 'react';
import 'react-table/react-table.css';
import placeholderImage from '../assets/product_image_placeholder.svg';

export default class ProductDetails extends Component {
  
    render() {
        let product = this.props.product
        if (product.img_url === "/Users/genevieve/Development/mod_5/skincare-tracker/frontend/src/assets/product_image_placeholder.svg") {
            product.img_url = placeholderImage
          }
        return (
        <div>
                <div>
                    <img src={product.img_url} alt={product.id} height="150px"/>
                </div>
                <div>
                    <b>Brand: </b> {this.props.product.brand}
                </div>
                <div>
                    <b>Name: </b> {this.props.product.name}
                </div>
                <div>
                    <b>Category: </b> {this.props.product.category}
                </div>
                <div>
                    <b>SPF: </b> {this.props.product.spf}
                </div>
                <div>
                    <b>PA: </b> {this.props.product.pa}
                </div>

        </div>
        )
    }
}