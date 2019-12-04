import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import PageTitle from './PageTitle';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class AddToShelf extends Component {
  state = {
    productData: []
  }

  handleChange = (e, d) => {
    this.setState({ [d.name]: d.value })
  }

  handleSubmit = () => {
    fetch(`http://localhost:3000/productsearch?search=${this.state.userInput}`)
      .then(res => res.json())
      .then(data => {
        this.formatData(data, this.props.usersProductReviews)
      })        
  }
  
  formatData = (products, usersProductReviews) => {
    let productData = []
    let usersProductIds = []
    if (products && usersProductReviews) {
      usersProductReviews.product_reviews.map ((review) => {
        return usersProductIds.push(review.product.id)          
      })

      // eslint-disable-next-line
      products.map ((product) => {
        if (usersProductIds.includes(product.id)) {
          // This line can be removed if there's a reasonable ".excludes()" method.
        } else {
          return productData = [...productData,
            {
              "id": product.id,
              "brand": product.brand,
              "name": <Link to={`/products/${product.id}`}>{product.name}</Link>,
              "category": product.category,
              "img_url": <img src={product.img_url} height="100" alt={product.id}/>,
              "sunscreen_type": product.sunscreen_type,
              "spf": product.spf,
              "pa": product.pa,
              "add": <Button
                as={ Link } to={`/addtoshelf/${product.id}`}
                className="ui button"
              >
                Add to Shelf
              </Button>
            }
          ]
        }
      })
    } else {
      console.log("Data not being received (ProductTable.js)")
    }
    this.setState({
      productData: productData
    })
  }
      
  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    const content = row[id];
    if (typeof content !== 'undefined') {  
      // filter by text in the table or if it's a object, filter by key
      if (typeof content === 'object' && content !== null && content.props.children) {
        return String(content.props.children).toLowerCase().includes(filter.value.toLowerCase());
      } else {
        return String(content).toLowerCase().includes(filter.value.toLowerCase());
      }
    }
  }

  render() {
    const columns = [
      {
        Header: 'Image',
        accessor: 'img_url',
        width: 115
      }, {
        Header: 'Brand',
        accessor: 'brand',
        width: 100
      }, {
        Header: 'Name',
        accessor: 'name',
        style: { 'whiteSpace': 'unset' },
        width: 175
      }, {
        Header: 'Category',
        accessor: 'category',
        width: 100,
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "cleanser") {
            return row[filter.id] === "Cleanser";
          }
          if (filter.value === "eye care") {
            return row[filter.id] === "Eye Care";
          }
          if (filter.value === "lip care") {
            return row[filter.id] === "Lip Care";
          }
          if (filter.value === "mask") {
            return row[filter.id] === "Mask";
          }
          if (filter.value === "moisturizer") {
            return row[filter.id] === "Moisturizer";
          }
          if (filter.value === "mist") {
            return row[filter.id] === "Mist";
          }
          if (filter.value === "sunscreen") {
            return row[filter.id] === "Sunscreen";
          }
          if (filter.value === "toner") {
            return row[filter.id] === "Toner";
          }
          if (filter.value === "treatment") {
            return row[filter.id] === "Treatment";
          }
          return row[filter.id] === "Misc";
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            <option value="cleanser">Cleansers</option>
            <option value="eye care">Eye Care</option>
            <option value="lip care">Lip Care</option>
            <option value="mask">Masks</option>
            <option value="moisturizer">Moisturizers</option>
            <option value="mist">Mists</option>
            <option value="sunscreen">Sunscreens</option>
            <option value="toner">Toners</option>
            <option value="treatment">Treatments</option>
            <option value="misc">Other</option>
          </select>
      }, {
        Header: 'Sunscreen',
        columns: [{
          Header: 'SPF',
          accessor: 'spf',
          width: 45,
        }, {
          Header: 'PA',
          accessor: 'pa',
          style: { 'whiteSpace': 'unset' },
          width: 45,
        }]
      }, {
        Header: 'Add Product',
        accessor: 'add',
      }
    ]
  
    return (
      <div>
        <PageTitle location="addtoshelf" />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            control={Input}
            label="Search by Brand or Product"
            name="userInput"
            placeholder=""
            onChange={this.handleChange}
          />
          <Form.Button>Search</Form.Button>
        </Form>
        
        <ReactTable
          data={this.state.productData}
          columns={columns}
          defaultPageSize={25}
          noDataText="Search for a product to see results."
          style={{
            height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
          filterable={true}
          defaultFilterMethod={this.filterCaseInsensitive}
          defaultSorted={[
            {
              id: "current",
              desc: true
            }
          ]}
        />
        <center><p><i>Tip: Hold shift when sorting to sort by multiple columns!</i></p></center>
      </div>
    )
  }
}