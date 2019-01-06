import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.book.title} by {this.state.book.authors}
              </h1>
              
            </Jumbotron>
          </Col>
        </Row>
       
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              
              <h1>Synopsis</h1>
              <p>
                {this.state.book.description}
              </p>
              <p>
                <a href={this.state.book.link} target="_blank" rel="noopener noreferrer">Link to Google Book Page</a>
              </p>
            </article>
          </Col>
          <Col size="md-1">
                <img src={this.state.book.image} alt="book"/>
          </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <Link to="/savedBooks">← Back to Saved Books</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
