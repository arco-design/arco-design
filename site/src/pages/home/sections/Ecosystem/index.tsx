import React from 'react';
import { teaLog } from '@arco-materials/site-utils';
import LogoDesignLab from '../../assets/logo_DesignLab.svg';
import LogoDesignLabBlue from '../../assets/logo_DesignLab_blue.svg';
import LogoDesignGray from '../../assets/logo_DesignLab_gray.svg';
import LogoArcoPro from '../../assets/logo_ArcoPro.svg';
import LogoArcoProBlue from '../../assets/logo_ArcoPro_blue.svg';
import LogoArcoProGray from '../../assets/logo_ArcoPro_gray.svg';
import LogoArcoMaterial from '../../assets/logo_ArcoMaterial.svg';
import LogoArcoMaterialBlue from '../../assets/logo_ArcoMaterial_blue.svg';
import LogoArcoMaterialGray from '../../assets/logo_ArcoMaterial_gray.svg';
import LogoIconBox from '../../assets/logo_IconBox.svg';
import LogoIconBoxBlue from '../../assets/logo_IconBox_blue.svg';
import LogoIconBoxGray from '../../assets/logo_IconBox_gray.svg';
import LogoPalette from '../../assets/logo_Palette.svg';
// import LogoPaletteBlue from '../../assets/logo_Palette_blue.svg';
import LogoPaletteGray from '../../assets/logo_Palette_gray.svg';
import IconMore from '../../assets/ic_More.svg';
import IconMoreGray from '../../assets/ic_More_gray.svg';
import LogoFontMall from '../../assets/logo_FontMall.svg';
import LogoFontMallBlue from '../../assets/logo_FontMall_blue.svg';
import LogoBrandStore from '../../assets/logo_BrandStore.svg';
import LogoBrandStoreBlue from '../../assets/logo_BrandStore_blue.svg';
import useLocale from '../../hooks/useLocale';
import useIsMobile from '../../utils/useIsMobile';
import { ecosystem } from '../../utils/cdn-resource';

import {
  linkArcoMaterial,
  linkArcoPro,
  linkDesignLab,
  linkArcoIconBox,
  linkPalette,
} from '../../constant/links';
import { TabItem, EcosystemItem } from './interface';
import Section from '../../components/Section';
import EcosystemTabList from './components/tabList';
import EcosystemBlockList from './components/blockList';

import ContentArcoPro from '../../content/Pro';
import ContentDesignLab from '../../content/Token';
import ContentIconBox from '../../content/Icons';
import ContentPalette from '../../content/Palette';
import ContentMaterial from '../../content/Material';
import { EventMap } from '../../utils/eventMap';

export default function Ecosystem() {
  const isMobile = useIsMobile();
  const locale = useLocale();
  const restList: EcosystemItem[] = [
    {
      name: 'BrandStore',
      desc: locale['ecosystem.item.BrandStore.desc'],
      logo: <LogoBrandStore />,
      logoPlaceholder: <LogoBrandStoreBlue />,
      image: ecosystem.brandStore,
    },
    {
      name: 'FontMall',
      desc: locale['ecosystem.item.fontMall.desc'],
      logo: <LogoFontMall />,
      logoPlaceholder: <LogoFontMallBlue />,
      image: ecosystem.fontMall,
    },
  ];
  const tabList: TabItem[] = [
    {
      name: 'DesignLab',
      alias: locale['ecosystem.item.DesignLab.alias'],
      slogan: locale['ecosystem.item.DesignLab.slogan'],
      // desc: locale['ecosystem.item.DesignLab.desc'],
      logo: <LogoDesignLab />,
      logoPlaceholder: <LogoDesignLabBlue />,
      logoInActive: <LogoDesignGray />,
      href: linkDesignLab,
      content: <ContentDesignLab />,
    },
    {
      name: 'ArcoPro',
      alias: locale['ecosystem.item.ArcoPro.alias'],
      slogan: locale['ecosystem.item.ArcoPro.slogan'],
      // desc: locale['ecosystem.item.ArcoPro.desc'],
      logo: <LogoArcoPro />,
      logoInActive: <LogoArcoProGray />,
      logoPlaceholder: <LogoArcoProBlue />,
      href: linkArcoPro,
      content: <ContentArcoPro />,
    },
    {
      name: 'Palette',
      alias: locale['ecosystem.item.Palette.alias'],
      slogan: locale['ecosystem.item.Palette.slogan'],
      // desc: locale['ecosystem.item.Palette.desc'],
      logo: <LogoPalette />,
      logoInActive: <LogoPaletteGray />,
      logoPlaceholder: <LogoPalette />,
      href: linkPalette,
      content: <ContentPalette />,
    },
    {
      name: 'IconBox',
      alias: locale['ecosystem.item.IconBox.alias'],
      slogan: locale['ecosystem.item.IconBox.slogan'],
      // desc: locale['ecosystem.item.IconBox.desc'],
      logo: <LogoIconBox />,
      logoInActive: <LogoIconBoxGray />,
      logoPlaceholder: <LogoIconBoxBlue />,
      href: linkArcoIconBox,
      content: <ContentIconBox />,
    },
    {
      name: 'MaterialMarket',
      alias: locale['ecosystem.item.MaterialMarket.alias'],
      slogan: locale['ecosystem.item.MaterialMarket.slogan'],
      // desc: locale['ecosystem.item.MaterialMarket.desc'],
      logo: <LogoArcoMaterial />,
      logoInActive: <LogoArcoMaterialGray />,
      logoPlaceholder: <LogoArcoMaterialBlue />,
      href: linkArcoMaterial,
      content: <ContentMaterial />,
    },
  ];
  const tabMore: TabItem = {
    name: 'More',
    alias: locale['ecosystem.item.More.alias'],
    logo: <IconMore />,
    logoInActive: <IconMoreGray />,
    content: <EcosystemBlockList list={restList} />,
    headerLess: true,
  };

  const reportTea = (ecosystem: EcosystemItem) => {
    teaLog(ecosystem.href ? EventMap.clickEcosystemBtn : EventMap.clickMoreEcosystem, {
      menu: ecosystem.name,
      link: ecosystem.href,
      target: '_blank',
      name: ecosystem.name,
    });
  };

  return (
    <>
      <Section
        headerProps={{
          title: locale['ecosystem.title'],
          subTitle: locale['ecosystem.subTitle'],
        }}
        addTracker
      >
        {isMobile ? (
          <EcosystemBlockList list={[...tabList, ...restList]} animation reportTea={reportTea} />
        ) : (
          <EcosystemTabList list={[...tabList, tabMore]} reportTea={reportTea} />
        )}
      </Section>
    </>
  );
}
