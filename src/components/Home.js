import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [documents, setDocuments] = useState([]); // Init as array inst of string

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents');
                // const data = [
                //     {
                //         _id: '1',
                //         title: 'Placeholder title',
                //         content: 'Placeholder content'
                //     },
                //     {
                //         _id: '2',
                //         title: 'Placeholder title2',
                //         content: 'Placeholder content2'
                //     }
                // ];
                const data = await response.json();
                console.log("Data", data);
                
                setDocuments(data.data); // nested object
                // setDocuments(data); // nested object
                // console.log("Documents", documents);
            } catch (e) {
                console.error(e);
                setDocuments([{ error: 'Error fetching data'}]); // Adjust error for display instead of array
            }
        };

        fetchData();
        // try {
        // fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/')
        // // .then(res => res.json())
        // // .then(res => setMessage(res.description));
        // // .then(res => res);
        // } catch (e) {
        // console.error(e);
        // }
        
    }, []);

    return (
        <main>
            <h1>Hem</h1>
            {documents.length > 0 ? ( // Check if array
                documents.map((document) => ( // Iterate
                    // Use _id as key prop, give unique id to let React track elements 
                    // when re-rendering virtual DOM
                    <div key={document._id}>
                        <h2><Link to={`/${document._id}`}>{document.title}</Link></h2>
                    </div>
                ))
            ) : (
                // Conditional rendering, '?.'= optional chaining, prevents error if element is undefined.
                <p>{documents[0]?.error ? documents[0].error : 'Laddar...'}</p>
            )}
            <button>
                <Link to="/documentform">Nytt dokument</Link>
            </button>
        </main>
    );
};

export default Home;