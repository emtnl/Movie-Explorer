import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './appBanner.scss';

const AppBanner = () => {
  return (
    <Navbar expand="lg" className="app-banner">
      <Container fluid>
        <Navbar.Brand href="#">Movie Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" active>
              Главная
            </Nav.Link>
            <Nav.Link href="#action2">Топ рейтинга</Nav.Link>
            <NavDropdown title="Жанры" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Ужасы</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Комедии</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Драмы</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action6">Новинки</Nav.Link>
          </Nav>
          <Form className="d-flex gap-2">
            <Form.Control
              type="search"
              placeholder="Название фильма"
              className="color-search-panel"
              aria-label="Поиск фильма"
            />
            <Button type="submit" variant="dark">
              Найти
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppBanner;