import { useEffect, useState } from 'react';
import { Button } from './Button';
import {GenreResponse} from '../App';
import { api } from '../services/api';

type SideBarProps = {
  selectedGenreId: number,
  handleClickButton: Function,
}

export function SideBar(props: SideBarProps) {
  const {
    selectedGenreId,
    handleClickButton,
  } = props;

  const [genres, setGenres] = useState<GenreResponse[]>([]);

  useEffect(() => {
    api.get<GenreResponse[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
  </nav>
  );
}