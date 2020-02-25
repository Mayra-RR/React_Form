import React from "react";
import axios from "axios";
import Formulario from "./componentes/Formulario";
import Header from "./componentes/Header";
import PostsList from "./componentes/PostsList";

import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: "MayraR",
        password: "paswword123"
      },
      error: "",
      posts: []
    };
    this.logout = this.logout.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(result => {
      this.setState({
        posts: result.data
      });
    });
  }

  logout() {
    this.setState({
      user: {
        userName: "",
        password: ""
      }
    });
  }

  signin() {
    this.setState({
      user: {
        userName: "WemanConnect",
        password: "we123"
      }
    });
  }

  componentDidUpdate() {
    console.log("Updating phase: componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("Updating phase: constructor");
  }
  static getDeirvedStateFromError(error) {
    //Actualiza el state, asi el siguiente renderizado lo mostrara en la UI
    return { error: error };
  }
  componentDidCatch(error, info) {
    console.log("Error phase: " + error);
  }

  render() {
    console.log(this.state.posts);
    /*if (this.state.error){
      return <div>User not found</div>
    } */
    return (
      <div className="container">
        <Header
          user={this.state.user.userName}
          logout={this.logout}
          signin={this.signin}
        />
        {//Mostrar si no hay usuario logeado
        this.state.user.userName ? (
          <PostsList posts={this.state.posts} />
        ) : (
          <Formulario
            userName={this.state.user.userName}
            password={this.state.user.password}
          />
        )}

        <footer>By WemanConnect</footer>
      </div>
    );
  }
}
