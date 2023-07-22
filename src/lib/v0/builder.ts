import { RemoteV0 } from './types'

export class DocumentBuilder {
  private sliceCounter = 0
  private caption: RemoteV0.CaptionElement[] = []
  private textSlices: RemoteV0.SliceElement[] = []
  private linkSlices: RemoteV0.SliceElement[] = []
  private bvSlices: RemoteV0.SliceElement[] = []
  private imageListSlices: RemoteV0.ImageListElement[] = []
  private tagIdsSlices: number[] = []
  private formatData: RemoteV0.PostFormatElement[] = []

  private nextSliceId(): string {
    return (this.sliceCounter++).toString()
  }

  text(
    content: string,
    style?: RemoteV0.PostFormatElementTextStyleAttributes
  ): RemoteV0.PostFormatElementText {
    const sliceId = this.nextSliceId()

    const element: RemoteV0.PostFormatElementText = {
      type: 'text',
      contentId: sliceId,
      ...style
    }

    this.caption.push({ type: 'text', id: sliceId })
    this.textSlices.push({ id: sliceId, c: content })
    return element
  }

  emoji(id: string): RemoteV0.PostFormatElementEmoji {
    const element: RemoteV0.PostFormatElementEmoji = {
      type: 'emoji',
      id
    }
    this.caption.push({ type: 'emoji', id })
    return element
  }

  biliVideo(bvId: string): RemoteV0.PostFormatElementBVideo {
    const sliceId = this.nextSliceId()

    const element: RemoteV0.PostFormatElementBVideo = {
      type: 'b_video',
      bvId: sliceId
    }

    this.bvSlices.push({ id: sliceId, c: bvId })
    return element
  }

  link(content: string, url: string): RemoteV0.PostFormatElementLink {
    const contentSliceId = this.nextSliceId()
    const urlSliceId = this.nextSliceId()

    const element: RemoteV0.PostFormatElementLink = {
      type: 'link',
      contentId: contentSliceId,
      linkId: urlSliceId
    }

    this.textSlices.push({ id: contentSliceId, c: content })
    this.linkSlices.push({ id: urlSliceId, c: url })
    this.caption.push({ type: 'text', id: contentSliceId })

    return element
  }

  paragraphWithOptions(
    options: Omit<
      RemoteV0.PostFormatElementParagraph,
      'type' | 'contents'
    > = {},
    ...contents: RemoteV0.PostFormatElement[]
  ): RemoteV0.PostFormatElementParagraph {
    return { type: 'paragraph', contents, ...options }
  }

  paragraph(
    ...contents: RemoteV0.PostFormatElement[]
  ): RemoteV0.PostFormatElementParagraph {
    return { type: 'paragraph', contents }
  }

  image(
    image: Omit<RemoteV0.ImageListElement, 'id'>
  ): RemoteV0.PostFormatElementImage {
    const sliceId = this.nextSliceId()
    const element: RemoteV0.PostFormatElementImage = {
      type: 'image',
      imageId: sliceId
    }
    this.imageListSlices.push({
      id: sliceId,
      ...image
    })
    return element
  }

  divider(id: 0 | 1 | 2 | 3 | 4): RemoteV0.PostFormatElementDividingLine {
    const element: RemoteV0.PostFormatElementDividingLine = {
      type: 'dividing_line',
      id,
      children: [{ text: '' }]
    }
    this.formatData.push(element)
    return element
  }

  document(...contents: RemoteV0.PostFormatElement[]): this {
    this.formatData.push(...contents)
    return this
  }

  setImageList(imageListSlice: RemoteV0.ImageListElement[]): this {
    this.imageListSlices = imageListSlice
    return this
  }

  setTagIds(tagIdsSlice: number[]): this {
    this.tagIdsSlices = tagIdsSlice
    return this
  }

  finalize(): RemoteV0.Post {
    const post: RemoteV0.Post = {
      format: JSON.stringify({ version: 0, data: this.formatData }),
      // only keep the first 20 elements
      caption: this.caption.slice(0, 18),
      imageListSlice: this.imageListSlices,
      videoListSlice: [] as never[],
      textSlice: this.textSlices,
      linkSlice: this.linkSlices,
      bvSlice: this.bvSlices,
      atSlice: [] as never[],
      tagIdsSlice: this.tagIdsSlices
    }

    return post
  }

  reset(): void {
    this.sliceCounter = 0
    this.caption = []
    this.textSlices = []
    this.linkSlices = []
    this.bvSlices = []
    this.imageListSlices = []
    this.tagIdsSlices = []
    this.formatData = []
  }
}
