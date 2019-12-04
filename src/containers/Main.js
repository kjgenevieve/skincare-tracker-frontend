import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from '../components/Home';
import ProductTable from "../components/ProductTable";
import ProductProfile from "../components/ProductProfile";
import AddToShelf from "../components/AddToShelf";
import AddEditProduct from "../components/AddEditProduct";
import IngredientsTable from "../components/IngredientsTable";
import IngredientProfile from "./IngredientProfile";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      usersProductReviews: [],
      usersIngredients: [],
      currentIngredient: {}
    };
  }

  renderProductTable = () => {
    if (this.state.usersProductReviews.length === 0) {
      const user_id = 1
      let url = `http://localhost:3000/user_products/users/${user_id}`
      
      fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          usersProductReviews: data
        })
      })
      .then(() =>
        {return (
          <ProductTable usersProductReviews={this.state.usersProductReviews} />
        )})
    } else {
      return (
        <ProductTable usersProductReviews={this.state.usersProductReviews} />
      )
    }
  }

  renderAddToShelf = () => {
    if (this.state.usersProductReviews) {
      if (this.state.usersProductReviews.length === 0) {
        // I don't have state set.
        // Get usersProductReviews, set to state, render <AddToShelf /> with props.
        const user_id = 1;
        const url = `http://localhost:3000/user_products/users/${user_id}`;

        fetch(url)
        .then(resp => resp.json())
        .catch(error => console.log("There was a problem!", error))
        .then(data => {
          this.setState({
            usersProductReviews: data
          })
        }).then(() => {
          return (
            <AddToShelf usersProductReviews={this.state.usersProductReviews} />
          )
        })
      } else {
        // I have access to both state.usersProductReviews && state.allProducts.
        // Render <AddToShelf /> with props.
        return (
          <AddToShelf usersProductReviews={this.state.usersProductReviews} />
        )
      }
    }
  }

  renderIngredients = () => {
    let rawIngredients = []
    let usersIngredientsIds = []
    let usersIngredients = []
    if (this.state.usersIngredients.length === 0) {
      const user_id = 1
      fetch(`http://localhost:3000/users/${user_id}`)
      .then(res => res.json())
      .then((data) => {
        rawIngredients = data.user_ingredients.flat()
      })
      .then(() => {
        rawIngredients.map ((ingredient) => {
          if (usersIngredientsIds.includes(ingredient.id)) {

          } else {
            usersIngredientsIds.push(ingredient.id);
            usersIngredients.push(ingredient)
          }
        })
      })
      .then(() => {
        this.setState({
          usersIngredients: usersIngredients
        })
      })
      .then(() => {
        return (
          <IngredientsTable ingredients={this.state.usersIngredients} />
        )
      })
    } else {
      return (
        <IngredientsTable ingredients={this.state.usersIngredients} />
      )
    }
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <Home />
          )}
        />
        <Route
          exact
          path="/products"
          render={this.renderProductTable}
        />
        <Route
          exact
          path="/products/:id"
          render={(props) => (
            <ProductProfile {...props} />
          )}
        />
        <Route
          exact
          path="/addtoshelf"
          render={this.renderAddToShelf}
        />
        <Route
          exact
          path="/addtoshelf/:product_id"
          render={props => (
            <AddEditProduct {...props} products={this.state.allProducts} usersProducts={this.state.usersProducts}/>
          )}
        />
        <Route
          exact
          path="/ingredients"
          render={this.renderIngredients}
        />
        <Route
          path="/ingredients/:id"
          render={() => (
            <IngredientProfile />
          )}
        />
      </div>
    );
  }
}