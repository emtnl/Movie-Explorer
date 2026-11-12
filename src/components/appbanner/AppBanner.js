import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { closeFilterModal, openFilterModal, sortChange } from '../../reducer/MovieSlice';
import ModalBanner from './ModalBanner';
import './appBanner.scss';

const AppBanner = () => {
    const dispatch = useDispatch();
    const { isFilterModalOpen } = useSelector(state => state.movie);
    return (
        <>
        <Navbar expand="lg" className="app-banner">
            <Container fluid>
                <Navbar.Brand href="#">Movie Explorer</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="#action1" active>Главная</Nav.Link>
                        <Nav.Link onClick={() => dispatch(sortChange('vote_average.desc'))} href="#top">
                            Топ рейтинга
                        </Nav.Link>
                        <NavDropdown title="Жанры" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Ужасы</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Комедии</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Драмы</NavDropdown.Item>
                        </NavDropdown>
                        

                        <Nav.Link onClick={() => dispatch(openFilterModal())}>Фильтр</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <ModalBanner 
            isOpen={isFilterModalOpen} 
            onClose={() => dispatch(closeFilterModal())} 
        />
        </>
    );
};

export default AppBanner;