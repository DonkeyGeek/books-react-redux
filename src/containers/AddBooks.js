import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBook, deleteBook, deleteAllBooks } from '../redux/actions/actionAddBooks'
import FlipMove from 'react-flip-move';

const AddBooks = ({ libraryData, addBook, deleteBook, deletAll }) => {

    //console.log(libraryData)

    const initialState = {
        title: '',
        author: ''
    }

    const [newData, setNewData] = useState(initialState);


    const handleSubmit = e => {
        e.preventDefault();
        //console.log(newData);
        addBook(newData)

        // Vider le input
        setNewData(initialState)
    }

    const displaydata = libraryData.length > 0 ?
        <FlipMove>
        {
            libraryData.map(data => {
                return (
                    <li key={data.id} className="list-group-item list-group-item-light d-flex justify-content-between">
                        <span><strong>Titre: </strong> {data.title}</span>    
                        <span><strong>Auteur: </strong> {data.author}</span>
                        <span 
                           className="btn btn-danger"
                           onClick={() => deleteBook(data.id)}
                        >x</span>
                    </li>
                )
            })
        }
        </FlipMove>
        : <p className="text-center">Aucune data à afficher</p>

        const deleteAllBooksBtn = libraryData.length > 0 && 
        <div className="d-flex justify-content-center">
            <button 
               className="btn btn-danger mt-4 mb-5"
               onClick={() => deletAll()}
            >Effacer tous les livres</button>
        </div>

    return (
        <main role="main">
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                    <h1 className="display-4">BOOKS</h1>
                    <p>Ajouter un livre à votre bibliothèque</p>

                    <form className="form-inline justify-content-center" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                               value={newData.title}
                               type="text" 
                               className="form-control" 
                               placeholder="Titre"
                               required
                               onChange={ e => setNewData({...newData, title: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                               value={newData.author}
                               type="text" 
                               className="form-control ml-3" 
                               placeholder="Auteur"
                               required
                               onChange={ e => setNewData({...newData, author: e.target.value})}
                            />
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-outline-secondary ml-3">Ajouter un livre</button>
                        </div>
                        
                    </form>
                </div>
            </div>

            <div className="container" style={{minHeight: '200px'}}>

                <div className="row">
                    <div className="col-md-12">
                        <ul className="list-group">
                            { displaydata }
                        </ul>

                        { deleteAllBooksBtn }
                    </div>
                </div>
            </div>
        </main>
    )
}

const addStateToProps = state => {
    return {
        libraryData: state.library
    }
}

const addDispatchToProps = (dispatch) => {
    return {
        addBook: param => dispatch(addBook(param)),
        deleteBook: id => dispatch(deleteBook(id)),
        deletAll: () => dispatch(deleteAllBooks())
    }
}

export default connect(addStateToProps, addDispatchToProps)(AddBooks)
