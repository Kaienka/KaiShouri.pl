export type Headcanon = {
  character: string;
  content: string;
  nsfw: boolean;
}

export type OC = {
    name: string;
    surname?: string;
    age?: number;
    description: string;
    uniwersum?: string;
    gender?: string;
    sexuality?: string;
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

export type LinkElement = {
    title: string;
    desc?: string;
    href: string;
    children: React.ReactNode;
    target?:string;
}

export type DividerTitle = {
    title: string;
}

export type Fanfic = {
    abandoned: any;
    title: string;
    description: string;
    finished: boolean;
    titleEscaped: string,
    fandom: string,
    chapters: number,
    wordCount: string,
    nsfw: boolean,
    ship: string;
    date: string;
    links?: Links;
}

export type FanficShort = {
    title: string;
    description: string;
    finished: boolean;
    titleEscaped: string,
    fandom: string,
    chapters: number,
    wordCount: string,
    nsfw: boolean,
    abandoned?:boolean
}

export type Chapter = {
    fileContent: string;
    index: number;
    fic: string;
    chapterAmount: number;
    onLoad?: () => void;
}

export type FanficDetails = {
  fic: Fanfic;
  chapterTitles: string[];
}

export type Links = {
    ao3: string;
    ffnet: string;
    wattpad: string;
}

export type Content = {
    fileContent: string,
    index: number,
    fic: string,
    chapterAmount: number
}