export namespace RemoteV0 {
  export interface Post {
    format: string
    caption: CaptionElement[]
    imageListSlice: ImageListElement[]
    videoListSlice: never[]
    textSlice: SliceElement[]
    linkSlice: SliceElement[]
    bvSlice: SliceElement[]
    atSlice: never[]
    tagIdsSlice: number[]
  }

  export interface SliceElement {
    id: string

    /**
     * Content of the slice.
     * - For `textSlice`, this is the text content.
     * - For `linkSlice`, this can be either the text content or the link URL.
     * - For `bvSlice`, this is the Bilibili Video BVID.
     */
    c: string
  }

  export interface CaptionElement {
    type: 'text' | 'emoji'
    id: string
  }

  export interface ImageListElement {
    id: string
    width: number
    height: number
    size: number
    url: string
  }

  // Post `format`
  export interface PostFormat {
    version: 0
    data: PostFormatElement[]
  }

  export type PostFormatElement =
    | PostFormatElementParagraph
    | PostFormatElementText
    | PostFormatElementBVideo
    | PostFormatElementEmoji
    | PostFormatElementLink
    | PostFormatElementImage
    | PostFormatElementDividingLine

  export interface PostFormatElementParagraph {
    type: 'paragraph'
    contents: PostFormatElement[]
    /**
     * Header level.
     * `undefined` means this `paragraph` is not a header.
     */
    header?: number
  }

  export interface PostFormatElementTextStyleAttributes {
    bold?: boolean
    italic?: boolean
    /**
     * Underline style.
     * - `1`: single underline.
     * - `2`: double underline (?).
     * - `undefined`: no underline.
     */
    underline?: number
    foregroundColor?: string
  }

  export interface PostFormatElementText
    extends PostFormatElementTextStyleAttributes {
    type: 'text'
    /**
     * A reference of text content at this element. You can find the actual text content in `Post.textSlice`.
     * @example 0
     */
    contentId: string
  }

  export interface PostFormatElementBVideo {
    type: 'b_video'
    /**
     * A reference of the Bilibili Video ID.
     * You can find the actual Bilibili Video ID in `Post.bvSlice`.
     * @example: `1`
     */
    bvId: string
  }

  export interface PostFormatElementEmoji {
    type: 'emoji'
    /**
     * The actual ID of an emoji.
     * @example `yingbao-1__yingbao_cheers`: 鹰宝庆祝
     * @example `amiya-1__amiya_smile`: 阿米娅微笑
     */
    id: string
  }

  export interface PostFormatElementLink {
    type: 'link'
    /**
     * A reference of the text content of the link-if-ied text. You can find the actual text content in `Post.textSlice`.
     */
    contentId: string
    /**
     * A reference of the link URL. You can find the actual link URL in `Post.linkSlice`.
     */
    linkId: string
  }

  export interface PostFormatElementImage {
    type: 'image'
    /**
     * A reference of the image. You can find the actual image in `Post.imageListSlice`.
     */
    imageId: string
  }

  export interface PostFormatElementDividingLine {
    type: 'dividing_line'

    /**
     * The style of the dividing line.
     */
    id: 0 | 1 | 2 | 3 | 4

    children: [{ text: '' }] // I just don't get it. Why tf is this here?
  }
}
