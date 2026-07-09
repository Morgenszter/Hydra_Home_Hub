export interface PlaylistItem {

  id: string;

  source: any;

}

export default class AudioPlaylist {

  private playlist: PlaylistItem[] = [];

  add(
    item: PlaylistItem
  ) {

    this.playlist.push(item);

  }

  remove(
    id: string
  ) {

    this.playlist =
      this.playlist.filter(
        item => item.id !== id
      );

  }

  clear() {

    this.playlist = [];

  }

  next() {

    return this.playlist.shift();

  }

  getAll() {

    return [...this.playlist];

  }

  size() {

    return this.playlist.length;

  }

}