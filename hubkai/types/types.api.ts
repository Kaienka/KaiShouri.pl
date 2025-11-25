export type Headcanon = {
  character: string;
  content: string;
  nsfw: boolean;
}

export type SpotifyIFrame = {
    src: string;
}

export type Info = {
    children: React.ReactElement | string;
}

export type Text = {
    title: string,
    children: React.ReactNode,
    link?: string
}

export type LastUpdate = {
  fic: string;
  fanficName: string;
  chapterNo: number;
  chapter: string;
  finished: boolean;
  updatedAt: Date;
}

export type FanficUpdate = {
  chapter: string
  fanficName: string
  updatedAt: string
  chapterNo: number
  finished: boolean
}