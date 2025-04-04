import { Component } from "react";
import { Col, Card, Spinner, Alert } from "react-bootstrap";

// remove selected

const URL = 'http://www.omdbapi.com/?apikey=469ff3dc&s='


class SingleRowOne extends Component {

    state = {
        movies: [],
        isLoading: true,
        isError: false
    }

    getMovies = () => {

        fetch(URL + this.props.saga)
        .then((response)=>{
            if(response.ok){
                return response.json()
            } else {
                throw new Error('errrore nella fetch')
            }
        })
        .then((data) => {
            // array di film
            console.log('film object', data)
            console.log('film array', data.Search)


            // film riordinati per anno di uscita
            const sortedMovies = data.Search.sort((a, b) => parseInt(a.Year) - parseInt(b.Year))

            console.log('sorted movies', sortedMovies)


            this.setState({
                movies: sortedMovies,
                isLoading: false
            })         
        })
        .catch((err) => {
            console.log('errore', err)
            this.setState({
                isLoading: false,
                isError: true
            })
        })
    }

    componentDidMount() {
        this.getMovies()
    }



    render(){
        return(
            <>

            {/* spinner */}

            {
                this.state.isLoading === true && (
                    <div className="text-center">
                        <Spinner variant="primary" animation="border"  />
                    </div>
                )
            }

            {/* ERRORE */}
            {
                this.state.isError && (
                    <Alert variant='danger' className="text-center">
                        <i className="bi bi-bug"></i> Errore nella fetch <i className="bi bi-bug"></i>
                    </Alert>
                )
            }


            {
                this.state.movies.slice(0, 6).map((movie) =>( 
                        <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={4} xl={2} className="px-0 mb-1 mb-md-0 mx-sm-0">
                           <Card className="border-0 p-1 bg-dark selezione">
                                <Card.Img variant="top" src={movie.Poster} alt={movie.Title} className="w-100 locandine"/>
                            <Card.Title className="flex-grow-1 fs-6 text-light">{movie.Title}</Card.Title>
                            </Card>
                        </Col>
                ))

            }
            </>
        )
    }
}

export default SingleRowOne