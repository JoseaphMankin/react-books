import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    searchResults: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", authors: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {

      API.getGoogle(this.state.title)

      // API.saveBook({
      //   title: this.state.title,
      //   author: this.state.author,
      //   synopsis: this.state.synopsis
      // })
        // .then(res => this.loadBooks())
        .then(res => 
          {this.setState({searchResults: res.data.items}, () => console.log(this.state.searchResults))

        })
            // console.log(res.data.items[0].volumeInfo.title, 
            // res.data.items[0].volumeInfo.authors[0]))
        .catch(err => console.log(err));
    }
  };

  saveBook = (title, authors, description, image, link ) => {
    
    // event.preventDefault();
      API.saveBook({
        title,
        authors,
        description,
        image,
        link
      }).then(res => this.loadBooks())
            // console.log(res.data.items[0].volumeInfo.title, 
            // res.data.items[0].volumeInfo.authors[0]))
        .catch(err => console.log(err));
    
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for a Book</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              {/* <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              /> */}
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-6 sm-12">
          <List>
          {this.state.searchResults.map(book => (
            <ListItem key={book.id}>
            <Link to={"#!"}>
            <strong>
            {book.volumeInfo.title} by {book.volumeInfo.authors ? book.volumeInfo.authors[0]: "No Author Available"}
            </strong>
            </Link>
            <SaveBtn onClick={() => this.saveBook(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.description, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.infoLink)} />
            </ListItem>
            ))}
                {/* {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))} */}
              </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
