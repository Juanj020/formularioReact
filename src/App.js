import { useState } from 'react';
import './App.css';

let nextId = 0;

export default function App() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);
  const [editingArtist, setEditingArtist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const editArtist = (artist) => {
    setEditingArtist(artist);
    setName(artist.name);
    setIsEditing(true);
  };

  return (
    <header className='encabezado'>
      <h1>Escriba una palabra:</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          if (isEditing) {
            const updatedArtists = artists.map((artist) =>
              artist.id === editingArtist.id
                ? { ...artist, name }
                : artist
            );
            setArtists(updatedArtists);
            setIsEditing(false);
          } else {
            setArtists([
              ...artists,
              { id: nextId++, name: name }
            ]);
          }
          setName('');
          setEditingArtist(null);
        }}
      >
        {isEditing ? 'Guardar' : 'Añadir'}
      </button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => editArtist(artist)}>
              Editar
            </button>
            <button
              onClick={() => {
                setArtists(
                  artists.filter((a) => a.id !== artist.id)
                );
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
