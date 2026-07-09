export interface AudioProfile {

  name: string;

  volume: number;

}

class AudioProfiles {

  private profiles = new Map<
    string,
    AudioProfile
  >();

  add(
    profile: AudioProfile
  ) {

    this.profiles.set(
      profile.name,
      profile
    );

  }

  get(
    name: string
  ) {

    return this.profiles.get(
      name
    );

  }

  remove(
    name: string
  ) {

    this.profiles.delete(
      name
    );

  }

  getAll() {

    return Array.from(
      this.profiles.values()
    );

  }

}

const audioProfiles =
  new AudioProfiles();

export default audioProfiles;