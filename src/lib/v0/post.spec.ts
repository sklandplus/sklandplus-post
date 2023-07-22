import test from 'ava'
import { DocumentBuilder } from './builder'

test('all formats', t => {
  const expected = {
    format:
      '{"version":0,"data":[{"type":"paragraph","contents":[{"type":"text","contentId":"0"}]},{"type":"paragraph","contents":[{"type":"emoji","id":"yingbao-1__yingbao_cheers"},{"type":"emoji","id":"yingbao-1__yingbao_sleepy"}]},{"type":"paragraph","contents":[{"type":"emoji","id":"amiya-1__amiya_smile"},{"type":"emoji","id":"amiya-1__amiya_ye"}]},{"type":"b_video","bvId":"1"},{"type":"paragraph","contents":[{"type":"link","contentId":"2","linkId":"3"}]},{"type":"paragraph","contents":[{"type":"text","contentId":"4"}],"header":1},{"type":"paragraph","contents":[{"type":"text","contentId":"5"}],"header":2},{"type":"paragraph","contents":[{"type":"text","contentId":"6"}],"header":3},{"type":"paragraph","contents":[{"type":"text","bold":true,"contentId":"7"},{"type":"text","contentId":"8"},{"type":"text","italic":true,"contentId":"9"},{"type":"text","contentId":"10"},{"type":"text","underline":1,"contentId":"11"},{"type":"text","contentId":"12"},{"type":"text","bold":true,"italic":true,"contentId":"13"},{"type":"text","contentId":"14"},{"type":"text","bold":true,"underline":1,"contentId":"15"},{"type":"text","contentId":"16"},{"type":"text","underline":1,"italic":true,"contentId":"17"}]},{"type":"paragraph","contents":[{"type":"text","foregroundColor":"#90C208","contentId":"18"},{"type":"text","foregroundColor":"#222222","contentId":"19"},{"type":"text","foregroundColor":"#46AAFA","contentId":"20"},{"type":"text","bold":true,"foregroundColor":"#46AAFA","contentId":"21"},{"type":"text","foregroundColor":"#222222","contentId":"22"}]},{"type":"paragraph","contents":[]},{"type":"image","imageId":"23"}]}',
    caption: [
      {
        type: 'text',
        id: '0'
      },
      {
        type: 'emoji',
        id: 'yingbao-1__yingbao_cheers'
      },
      {
        type: 'emoji',
        id: 'yingbao-1__yingbao_sleepy'
      },
      {
        type: 'emoji',
        id: 'amiya-1__amiya_smile'
      },
      {
        type: 'emoji',
        id: 'amiya-1__amiya_ye'
      },
      {
        type: 'text',
        id: '2'
      },
      {
        type: 'text',
        id: '4'
      },
      {
        type: 'text',
        id: '5'
      },
      {
        type: 'text',
        id: '6'
      },
      {
        type: 'text',
        id: '7'
      },
      {
        type: 'text',
        id: '8'
      },
      {
        type: 'text',
        id: '9'
      },
      {
        type: 'text',
        id: '10'
      },
      {
        type: 'text',
        id: '11'
      },
      {
        type: 'text',
        id: '12'
      },
      {
        type: 'text',
        id: '13'
      },
      {
        type: 'text',
        id: '14'
      },
      {
        type: 'text',
        id: '15'
      }
    ],
    imageListSlice: [
      {
        width: 662,
        height: 680,
        size: 59225,
        url: 'https://bbs.hycdn.cn/image/2023/07/19/990dfc76c3c1a38a097250ccefe9f902.jpg',
        id: '23'
      }
    ],
    videoListSlice: [],
    textSlice: [
      {
        id: '0',
        c: 'rich text content'
      },
      {
        id: '2',
        c: 'Link Title (?)'
      },
      {
        id: '4',
        c: 'Header 1'
      },
      {
        id: '5',
        c: 'Header 2'
      },
      {
        id: '6',
        c: 'Header 3'
      },
      {
        id: '7',
        c: 'Bold'
      },
      {
        id: '8',
        c: ' '
      },
      {
        id: '9',
        c: 'Italic'
      },
      {
        id: '10',
        c: ' '
      },
      {
        id: '11',
        c: 'Underline'
      },
      {
        id: '12',
        c: ' '
      },
      {
        id: '13',
        c: 'Bold Italic'
      },
      {
        id: '14',
        c: ' '
      },
      {
        id: '15',
        c: 'Bold Underline'
      },
      {
        id: '16',
        c: ' '
      },
      {
        id: '17',
        c: 'Italic Underline'
      },
      {
        id: '18',
        c: 'Green Text'
      },
      {
        id: '19',
        c: ' '
      },
      {
        id: '20',
        c: 'Blue '
      },
      {
        id: '21',
        c: 'Text'
      },
      {
        id: '22',
        c: ' Regular'
      }
    ],
    linkSlice: [
      {
        id: '3',
        c: 'http://captive.apple.com'
      }
    ],
    bvSlice: [
      {
        id: '1',
        c: 'BV1xx411c7mD'
      }
    ],
    atSlice: [],
    tagIdsSlice: [474, 306]
  }

  const b = new DocumentBuilder()
  b.setTagIds([474, 306])
  const doc = b.document(
    b.paragraph(b.text('rich text content')),
    b.paragraph(
      b.emoji('yingbao-1__yingbao_cheers'),
      b.emoji('yingbao-1__yingbao_sleepy')
    ),
    b.paragraph(b.emoji('amiya-1__amiya_smile'), b.emoji('amiya-1__amiya_ye')),
    b.biliVideo('BV1xx411c7mD'),
    b.paragraph(b.link('Link Title (?)', 'http://captive.apple.com')),
    b.paragraphWithOptions({ header: 1 }, b.text('Header 1')),
    b.paragraphWithOptions({ header: 2 }, b.text('Header 2')),
    b.paragraphWithOptions({ header: 3 }, b.text('Header 3')),
    b.paragraph(
      b.text('Bold', { bold: true }),
      b.text(' '),
      b.text('Italic', { italic: true }),
      b.text(' '),
      b.text('Underline', { underline: 1 }),
      b.text(' '),
      b.text('Bold Italic', { bold: true, italic: true }),
      b.text(' '),
      b.text('Bold Underline', { bold: true, underline: 1 }),
      b.text(' '),
      b.text('Italic Underline', { italic: true, underline: 1 })
    ),
    b.paragraph(
      b.text('Green Text', { foregroundColor: '#90C208' }),
      b.text(' ', { foregroundColor: '#222222' }),
      b.text('Blue ', { foregroundColor: '#46AAFA' }),
      b.text('Text', { bold: true, foregroundColor: '#46AAFA' }),
      b.text(' Regular', { foregroundColor: '#222222' })
    ),
    b.paragraph(),
    b.image({
      width: 662,
      height: 680,
      size: 59225,
      url: 'https://bbs.hycdn.cn/image/2023/07/19/990dfc76c3c1a38a097250ccefe9f902.jpg'
    })
  )

  const actual = doc.finalize()

  expected.format = JSON.parse(expected.format)
  actual.format = JSON.parse(actual.format)

  t.deepEqual(actual, expected)
})
