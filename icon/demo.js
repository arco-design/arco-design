// 用在组件文档里，展示所有 Icon
import React, { useState } from 'react';
import {
  Radio,
  Input,
  Affix,
  Space,
  Slider,
  Select,
  InputNumber,
  Button,
  Modal,
  Typography,
} from '@arco-design/web-react';
import { IconCamera } from '@arco-design/web-react/icon';
import * as icons from '@arco-design/web-react/icon/index.es.js';
import { IconClassifyModal } from './classifyModal';
import { Tooltip } from '@arco-design/web-react';
import { teaLog } from '@arco-design/arco-site-utils';
import { EventMap } from '../site/src/pages/home/utils/eventMap';

const RadioGroup = Radio.Group;
const { Paragraph } = Typography;

const svgData = JSON.parse(
  '{"direction":{"outline":[{"name":"arrow-down","componentName":"IconArrowDown"},{"name":"arrow-fall","componentName":"IconArrowFall"},{"name":"arrow-left","componentName":"IconArrowLeft"},{"name":"arrow-right","componentName":"IconArrowRight"},{"name":"arrow-rise","componentName":"IconArrowRise"},{"name":"arrow-up","componentName":"IconArrowUp"},{"name":"caret-down","componentName":"IconCaretDown"},{"name":"caret-left","componentName":"IconCaretLeft"},{"name":"caret-right","componentName":"IconCaretRight"},{"name":"caret-up","componentName":"IconCaretUp"},{"name":"double-down","componentName":"IconDoubleDown"},{"name":"double-left","componentName":"IconDoubleLeft"},{"name":"double-right","componentName":"IconDoubleRight"},{"name":"double-up","componentName":"IconDoubleUp"},{"name":"down-circle","componentName":"IconDownCircle"},{"name":"down","componentName":"IconDown"},{"name":"drag-arrow","componentName":"IconDragArrow"},{"name":"expand","componentName":"IconExpand"},{"name":"left-circle","componentName":"IconLeftCircle"},{"name":"left","componentName":"IconLeft"},{"name":"menu-fold","componentName":"IconMenuFold"},{"name":"menu-unfold","componentName":"IconMenuUnfold"},{"name":"right-circle","componentName":"IconRightCircle"},{"name":"right","componentName":"IconRight"},{"name":"rotate-left","componentName":"IconRotateLeft"},{"name":"rotate-right","componentName":"IconRotateRight"},{"name":"shrink","componentName":"IconShrink"},{"name":"swap","componentName":"IconSwap"},{"name":"to-bottom","componentName":"IconToBottom"},{"name":"to-left","componentName":"IconToLeft"},{"name":"to-right","componentName":"IconToRight"},{"name":"to-top","componentName":"IconToTop"},{"name":"up-circle","componentName":"IconUpCircle"},{"name":"up","componentName":"IconUp"}]},"tips":{"fill":[{"name":"check-circle-fill","componentName":"IconCheckCircleFill"},{"name":"close-circle-fill","componentName":"IconCloseCircleFill"},{"name":"exclamation-circle-fill","componentName":"IconExclamationCircleFill"},{"name":"exclamation-polygon-fill","componentName":"IconExclamationPolygonFill"},{"name":"info-circle-fill","componentName":"IconInfoCircleFill"},{"name":"minus-circle-fill","componentName":"IconMinusCircleFill"},{"name":"plus-circle-fill","componentName":"IconPlusCircleFill"},{"name":"question-circle-fill","componentName":"IconQuestionCircleFill"}],"outline":[{"name":"check-circle","componentName":"IconCheckCircle"},{"name":"check-square","componentName":"IconCheckSquare"},{"name":"check","componentName":"IconCheck"},{"name":"clock-circle","componentName":"IconClockCircle"},{"name":"close-circle","componentName":"IconCloseCircle"},{"name":"close","componentName":"IconClose"},{"name":"exclamation-circle","componentName":"IconExclamationCircle"},{"name":"exclamation","componentName":"IconExclamation"},{"name":"info-circle","componentName":"IconInfoCircle"},{"name":"info","componentName":"IconInfo"},{"name":"minus-circle","componentName":"IconMinusCircle"},{"name":"minus","componentName":"IconMinus"},{"name":"plus-circle","componentName":"IconPlusCircle"},{"name":"plus","componentName":"IconPlus"},{"name":"question-circle","componentName":"IconQuestionCircle"},{"name":"question","componentName":"IconQuestion"},{"name":"stop","componentName":"IconStop"}]},"interactive-button":{"fill":[{"name":"heart-fill","componentName":"IconHeartFill"},{"name":"star-fill","componentName":"IconStarFill"},{"name":"thumb-down-fill","componentName":"IconThumbDownFill"},{"name":"thumb-up-fill","componentName":"IconThumbUpFill"}],"outline":[{"name":"at","componentName":"IconAt"},{"name":"cloud-download","componentName":"IconCloudDownload"},{"name":"code-block","componentName":"IconCodeBlock"},{"name":"code-square","componentName":"IconCodeSquare"},{"name":"code","componentName":"IconCode"},{"name":"customer-service","componentName":"IconCustomerService"},{"name":"download","componentName":"IconDownload"},{"name":"export","componentName":"IconExport"},{"name":"eye-invisible","componentName":"IconEyeInvisible"},{"name":"eye","componentName":"IconEye"},{"name":"heart","componentName":"IconHeart"},{"name":"history","componentName":"IconHistory"},{"name":"home","componentName":"IconHome"},{"name":"import","componentName":"IconImport"},{"name":"launch","componentName":"IconLaunch"},{"name":"list","componentName":"IconList"},{"name":"message-banned","componentName":"IconMessageBanned"},{"name":"message","componentName":"IconMessage"},{"name":"more-vertical","componentName":"IconMoreVertical"},{"name":"more","componentName":"IconMore"},{"name":"poweroff","componentName":"IconPoweroff"},{"name":"refresh","componentName":"IconRefresh"},{"name":"reply","componentName":"IconReply"},{"name":"save","componentName":"IconSave"},{"name":"scan","componentName":"IconScan"},{"name":"search","componentName":"IconSearch"},{"name":"select-all","componentName":"IconSelectAll"},{"name":"send","componentName":"IconSend"},{"name":"settings","componentName":"IconSettings"},{"name":"share-alt","componentName":"IconShareAlt"},{"name":"share-external","componentName":"IconShareExternal"},{"name":"share-internal","componentName":"IconShareInternal"},{"name":"star","componentName":"IconStar"},{"name":"sync","componentName":"IconSync"},{"name":"thumb-down","componentName":"IconThumbDown"},{"name":"thumb-up","componentName":"IconThumbUp"},{"name":"translate","componentName":"IconTranslate"},{"name":"upload","componentName":"IconUpload"},{"name":"voice","componentName":"IconVoice"}]},"edit":{"outline":[{"name":"align-center","componentName":"IconAlignCenter"},{"name":"align-left","componentName":"IconAlignLeft"},{"name":"align-right","componentName":"IconAlignRight"},{"name":"attachment","componentName":"IconAttachment"},{"name":"bg-colors","componentName":"IconBgColors"},{"name":"bold","componentName":"IconBold"},{"name":"brush","componentName":"IconBrush"},{"name":"copy","componentName":"IconCopy"},{"name":"delete","componentName":"IconDelete"},{"name":"edit","componentName":"IconEdit"},{"name":"eraser","componentName":"IconEraser"},{"name":"filter","componentName":"IconFilter"},{"name":"find-replace","componentName":"IconFindReplace"},{"name":"font-colors","componentName":"IconFontColors"},{"name":"formula","componentName":"IconFormula"},{"name":"h1","componentName":"IconH1"},{"name":"h2","componentName":"IconH2"},{"name":"h3","componentName":"IconH3"},{"name":"h4","componentName":"IconH4"},{"name":"h5","componentName":"IconH5"},{"name":"h6","componentName":"IconH6"},{"name":"h7","componentName":"IconH7"},{"name":"highlight","componentName":"IconHighlight"},{"name":"italic","componentName":"IconItalic"},{"name":"line-height","componentName":"IconLineHeight"},{"name":"link","componentName":"IconLink"},{"name":"oblique-line","componentName":"IconObliqueLine"},{"name":"ordered-list","componentName":"IconOrderedList"},{"name":"original-size","componentName":"IconOriginalSize"},{"name":"paste","componentName":"IconPaste"},{"name":"quote","componentName":"IconQuote"},{"name":"redo","componentName":"IconRedo"},{"name":"scissor","componentName":"IconScissor"},{"name":"sort-ascending","componentName":"IconSortAscending"},{"name":"sort-descending","componentName":"IconSortDescending"},{"name":"sort","componentName":"IconSort"},{"name":"strikethrough","componentName":"IconStrikethrough"},{"name":"underline","componentName":"IconUnderline"},{"name":"undo","componentName":"IconUndo"},{"name":"unordered-list","componentName":"IconUnorderedList"},{"name":"zoom-in","componentName":"IconZoomIn"},{"name":"zoom-out","componentName":"IconZoomOut"}]},"media":{"fill":[{"name":"mute-fill","componentName":"IconMuteFill"},{"name":"pause-circle-fill","componentName":"IconPauseCircleFill"},{"name":"play-arrow-fill","componentName":"IconPlayArrowFill"},{"name":"play-circle-fill","componentName":"IconPlayCircleFill"},{"name":"skip-next-fill","componentName":"IconSkipNextFill"},{"name":"skip-previous-fill","componentName":"IconSkipPreviousFill"},{"name":"sound-fill","componentName":"IconSoundFill"}],"outline":[{"name":"backward","componentName":"IconBackward"},{"name":"forward","componentName":"IconForward"},{"name":"fullscreen-exit","componentName":"IconFullscreenExit"},{"name":"fullscreen","componentName":"IconFullscreen"},{"name":"live-broadcast","componentName":"IconLiveBroadcast"},{"name":"music","componentName":"IconMusic"},{"name":"mute","componentName":"IconMute"},{"name":"pause-circle","componentName":"IconPauseCircle"},{"name":"pause","componentName":"IconPause"},{"name":"play-arrow","componentName":"IconPlayArrow"},{"name":"play-circle","componentName":"IconPlayCircle"},{"name":"record-stop","componentName":"IconRecordStop"},{"name":"record","componentName":"IconRecord"},{"name":"skip-next","componentName":"IconSkipNext"},{"name":"skip-previous","componentName":"IconSkipPrevious"},{"name":"sound","componentName":"IconSound"}]},"logo":{"color":[{"name":"bytedance-color","componentName":"IconBytedanceColor"},{"name":"lark-color","componentName":"IconLarkColor"},{"name":"tiktok-color","componentName":"IconTiktokColor"},{"name":"xigua-color","componentName":"IconXiguaColor"}],"fill":[{"name":"faceBook-circle-fill","componentName":"IconFaceBookCircleFill"},{"name":"facebook-square-fill","componentName":"IconFacebookSquareFill"},{"name":"google-circle-fill","componentName":"IconGoogleCircleFill"},{"name":"qq-circle-fill","componentName":"IconQqCircleFill"},{"name":"twitter-circle-fill","componentName":"IconTwitterCircleFill"},{"name":"weibo-circle-fill","componentName":"IconWeiboCircleFill"}],"outline":[{"name":"alipay-circle","componentName":"IconAlipayCircle"},{"name":"code-sandbox","componentName":"IconCodeSandbox"},{"name":"codepen","componentName":"IconCodepen"},{"name":"facebook","componentName":"IconFacebook"},{"name":"github","componentName":"IconGithub"},{"name":"gitlab","componentName":"IconGitlab"},{"name":"google","componentName":"IconGoogle"},{"name":"qq-zone","componentName":"IconQqZone"},{"name":"qq","componentName":"IconQq"},{"name":"twitter","componentName":"IconTwitter"},{"name":"wechat","componentName":"IconWechat"},{"name":"wechatpay","componentName":"IconWechatpay"},{"name":"weibo","componentName":"IconWeibo"}]},"general":{"fill":[{"name":"chinese-fill","componentName":"IconChineseFill"},{"name":"english-fill","componentName":"IconEnglishFill"},{"name":"face-frown-fill","componentName":"IconFaceFrownFill"},{"name":"face-meh-fill","componentName":"IconFaceMehFill"},{"name":"face-smile-fill","componentName":"IconFaceSmileFill"},{"name":"moon-fill","componentName":"IconMoonFill"},{"name":"pen-fill","componentName":"IconPenFill"},{"name":"sun-fill","componentName":"IconSunFill"}],"outline":[{"name":"apps","componentName":"IconApps"},{"name":"archive","componentName":"IconArchive"},{"name":"book","componentName":"IconBook"},{"name":"branch","componentName":"IconBranch"},{"name":"bug","componentName":"IconBug"},{"name":"bulb","componentName":"IconBulb"},{"name":"calendar-clock","componentName":"IconCalendarClock"},{"name":"calendar","componentName":"IconCalendar"},{"name":"camera","componentName":"IconCamera"},{"name":"cloud","componentName":"IconCloud"},{"name":"command","componentName":"IconCommand"},{"name":"common","componentName":"IconCommon"},{"name":"compass","componentName":"IconCompass"},{"name":"copyright","componentName":"IconCopyright"},{"name":"dashboard","componentName":"IconDashboard"},{"name":"desktop","componentName":"IconDesktop"},{"name":"dice","componentName":"IconDice"},{"name":"drag-dot-vertical","componentName":"IconDragDotVertical"},{"name":"drag-dot","componentName":"IconDragDot"},{"name":"drive-file","componentName":"IconDriveFile"},{"name":"ear","componentName":"IconEar"},{"name":"email","componentName":"IconEmail"},{"name":"empty","componentName":"IconEmpty"},{"name":"experiment","componentName":"IconExperiment"},{"name":"file-audio","componentName":"IconFileAudio"},{"name":"file-image","componentName":"IconFileImage"},{"name":"file-pdf","componentName":"IconFilePdf"},{"name":"file-video","componentName":"IconFileVideo"},{"name":"file","componentName":"IconFile"},{"name":"fire","componentName":"IconFire"},{"name":"folder-add","componentName":"IconFolderAdd"},{"name":"folder-delete","componentName":"IconFolderDelete"},{"name":"folder","componentName":"IconFolder"},{"name":"gift","componentName":"IconGift"},{"name":"idcard","componentName":"IconIdcard"},{"name":"image-close","componentName":"IconImageClose"},{"name":"image","componentName":"IconImage"},{"name":"interaction","componentName":"IconInteraction"},{"name":"language","componentName":"IconLanguage"},{"name":"layout","componentName":"IconLayout"},{"name":"loading","componentName":"IconLoading"},{"name":"location","componentName":"IconLocation"},{"name":"lock","componentName":"IconLock"},{"name":"loop","componentName":"IconLoop"},{"name":"man","componentName":"IconMan"},{"name":"menu","componentName":"IconMenu"},{"name":"mind-mapping","componentName":"IconMindMapping"},{"name":"mobile","componentName":"IconMobile"},{"name":"moon","componentName":"IconMoon"},{"name":"mosaic","componentName":"IconMosaic"},{"name":"nav","componentName":"IconNav"},{"name":"notification-close","componentName":"IconNotificationClose"},{"name":"notification","componentName":"IconNotification"},{"name":"palette","componentName":"IconPalette"},{"name":"pen","componentName":"IconPen"},{"name":"phone","componentName":"IconPhone"},{"name":"printer","componentName":"IconPrinter"},{"name":"public","componentName":"IconPublic"},{"name":"pushpin","componentName":"IconPushpin"},{"name":"qrcode","componentName":"IconQrcode"},{"name":"robot-add","componentName":"IconRobotAdd"},{"name":"robot","componentName":"IconRobot"},{"name":"safe","componentName":"IconSafe"},{"name":"schedule","componentName":"IconSchedule"},{"name":"shake","componentName":"IconShake"},{"name":"skin","componentName":"IconSkin"},{"name":"stamp","componentName":"IconStamp"},{"name":"storage","componentName":"IconStorage"},{"name":"subscribe-add","componentName":"IconSubscribeAdd"},{"name":"subscribe","componentName":"IconSubscribe"},{"name":"subscribed","componentName":"IconSubscribed"},{"name":"sun","componentName":"IconSun"},{"name":"tag","componentName":"IconTag"},{"name":"tags","componentName":"IconTags"},{"name":"thunderbolt","componentName":"IconThunderbolt"},{"name":"tool","componentName":"IconTool"},{"name":"trophy","componentName":"IconTrophy"},{"name":"unlock","componentName":"IconUnlock"},{"name":"user-add","componentName":"IconUserAdd"},{"name":"user-group","componentName":"IconUserGroup"},{"name":"user","componentName":"IconUser"},{"name":"video-camera","componentName":"IconVideoCamera"},{"name":"wifi","componentName":"IconWifi"},{"name":"woman","componentName":"IconWoman"}]}}'
);
const newIcons = JSON.parse(
  '[{"file":"general/outline/palette.svg","name":"IconPalette","version":"2.19.2"},{"file":"general/outline/calendar-clock.svg","name":"IconCalendarClock","version":"2.20.0"}]'
);

const lineCaps = ['butt', 'round', 'square'];
const lineJoins = ['arcs', 'bevel', 'miter', 'miter-clip', 'round'];

const locale = {
  'zh-CN': {
    title: '图标配置',
    line: '线性图标',
    fill: '面性图标',
    color: '多色图标',
    search: '搜索图标，点击可复制图标用法',
    'stroke-width': '线宽：',
    size: '图标大小：',
    lineJoin: '拐角：',
    lineCap: '端点：',
    desc1: '全局配置（将以下的类添加到 css 中）:',
    desc2: (
      <span>
        单个组件的话可以直接将以上样式写到 <code>IconXXX</code> 的 <code>style</code> 中
      </span>
    ),
    'show-config': '显示配置',
    add: '添加',
    iconClassifyModalTitle: '上传图片搜索图标',
  },
  'en-US': {
    title: 'Icon Configuration',
    line: 'Stroke',
    fill: 'Fill',
    color: 'Color',
    search: 'Search icon, click to copy usage',
    'stroke-width': 'Stroke Width:',
    size: 'Size:',
    lineJoin: 'Line Join:',
    lineCap: 'Line Cap:',
    desc1: 'Global configuration (add the following class to css):',
    desc2: (
      <span>
        For a single component, you can directly write the above style to the <code>style</code>
        of <code>IconXXX</code>
      </span>
    ),
    'show-config': 'Show Config',
    add: 'Add',
    iconClassifyModalTitle: 'Upload an image to search for icons',
  },
};

export default function ({ lang = 'zh-CN' }) {
  const [type, setType] = useState('outline');
  const [filter, setFilter] = useState('');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [lineCap, setLineCap] = useState('butt');
  const [lineJoin, setLineJoin] = useState('miter');
  const [fontSize, setFontSize] = useState(32);
  const sliderStyle = { width: 120, marginRight: 20 };
  const inputNumberStyle = { width: 60 };
  const getWidthStyle = (width) => ({ width });
  const iconStyle = { fontSize };
  const spaceStyle = { justifyContent: 'space-between', whiteSpace: 'nowrap' };
  const [iconClassifyModalVisible, setIconClassifyModalVisible] = useState(false);

  const maps = JSON.parse(
    '{"zh-CN":{"direction":"方向指示类图标","tips":"提示建议类图标","interactive-button":"交互按钮类图标","edit":"编辑类图标","media":"影音类图标","logo":"商标类图标","general":"通用类图标"},"en-US":{"direction":"Direction indicator","tips":"Prompt suggestion","interactive-button":"Interactive button","edit":"Editable","media":"Media","logo":"Logo","general":"General"}}'
  )[lang];

  const t = locale[lang];

  return (
    <div>
      <div className="iconlist-bar">
        <RadioGroup
          size="large"
          type="button"
          mode="fill"
          name="type"
          defaultValue="outline"
          onChange={setType}
        >
          <Radio value="outline">{t.line}</Radio>
          <Radio value="fill">{t.fill}</Radio>
          <Radio value="color">{t.color}</Radio>
        </RadioGroup>
        <Input.Search size="large" onChange={setFilter} placeholder={t.search} />
        <Tooltip content={t.iconClassifyModalTitle}>
          <Button
            size="large"
            icon={<IconCamera />}
            style={{ marginLeft: 8 }}
            onClick={() => {
              teaLog(EventMap.searchIconByImg, { type: 'open' });
              setIconClassifyModalVisible(true);
            }}
          />
          <IconClassifyModal
            title={t.iconClassifyModalTitle}
            lang={lang}
            visible={iconClassifyModalVisible}
            onVisibleChange={setIconClassifyModalVisible}
          />
        </Tooltip>
      </div>
      <Affix offsetTop={60} className="iconlist-affix">
        <Space className="iconlist-operations" style={spaceStyle}>
          <Space>
            {t['stroke-width']}
            <Slider
              defaultValue={4}
              style={sliderStyle}
              showTicks
              min={1}
              max={5}
              onChange={(value) => setStrokeWidth(value)}
            />
            {t.size}
            <InputNumber
              min={14}
              max={80}
              value={fontSize}
              onChange={(value) => setFontSize(value)}
              style={inputNumberStyle}
            />
            {t.lineJoin}
            <Select
              options={lineJoins}
              value={lineJoin}
              onChange={(value) => setLineJoin(value)}
              style={getWidthStyle(100)}
            />
            {t.lineCap}
            <Select
              options={lineCaps}
              value={lineCap}
              onChange={(value) => setLineCap(value)}
              style={getWidthStyle(84)}
            />
          </Space>
          <Button
            type="primary"
            onClick={() =>
              Modal.success({
                title: t.title,
                content: (
                  <div>
                    <Paragraph>{t.desc1} </Paragraph>
                    <Paragraph code>{`.arco-icon {
                      font-size: ${fontSize};
                      ${lineCap !== 'butt' ? `stroke-linecap: ${lineCap};` : ''}
                      ${lineJoin !== 'miter' ? `stroke-linejoin: ${lineJoin};` : ''}
                      ${strokeWidth !== 4 ? `stroke-width: ${strokeWidth};` : ''}
                    }`}</Paragraph>
                    <Paragraph>{t.desc2}</Paragraph>
                  </div>
                ),
              })
            }
          >
            {t['show-config']}
          </Button>
        </Space>
      </Affix>
      {Object.keys(svgData).map((key) => {
        const filteredData =
          filter && svgData[key][type]
            ? svgData[key][type].filter((s) => {
                return s.componentName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
              })
            : svgData[key][type];
        let className = 'iconlist-wrapper';
        if (key === 'out-of-date') {
          className += ' out-of-date';
        }
        return filteredData && filteredData.length ? (
          <div className={className} key={key}>
            <div className="iconlist-title" id={maps[key]}>
              {maps[key]}
            </div>
            <ul className="iconlist">
              {filteredData.map((n) => {
                const Tag = icons[n.componentName];
                const newIcon = newIcons.find((_n) => _n.name === n.componentName);
                return (
                  <li key={n.componentName} className="icon-cell" aria-label={n.componentName}>
                    <div className="icon-show">
                      <Tag
                        strokeWidth={strokeWidth}
                        strokeLinecap={lineCap}
                        strokeLinejoin={lineJoin}
                        style={iconStyle}
                      />
                    </div>
                    <p className="name">{n.componentName}</p>
                    {newIcon ? (
                      <span className="version">
                        {newIcon.version} {t.add}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null;
      })}
    </div>
  );
}
