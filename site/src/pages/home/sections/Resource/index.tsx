// 资源汇集的板块
import React from 'react';
import { Space } from '@arco-design/web-react';
import Section from '../../components/Section';
import ResourceCard from './components/Card';
import LogoFigmaBlue from '../../assets/logo_Figma_blue.svg';
import LogoSketchBlue from '../../assets/logo_Sketch_blue.svg';
import LogoIconBoxBlue from '../../assets/logo_IconBox_blue.svg';
import LogoArcoProBlue from '../../assets/logo_ArcoPro_blue.svg';
import LogoGitHubWhite from '../../assets/logo_Github_white.svg';
import LogoArcoCliWhite from '../../assets/logo_ArcoCli_white.svg';
import LogoArcoWebpackPluginWhite from '../../assets/logo_ArcoWebpackPlugin_white.svg';
import LogoReact from '../../assets/logo_react.svg';
import LogoMobile from '../../assets/logo_mobile.svg';
import LogoVue from '../../assets/logo_vue.svg';
import LogoJiShiBlue from '../../assets/logo_JiShi_blue.svg';
import {
  linkDocsArcoComponent,
  linkDocsComponentUsage,
  linkDesignerDocs,
  linkDocsDesignPrinciples,
  linkFigmaArcoComponent,
  linkFigmaArcoPro,
  linkMobileComponent,
  linkFigmaArcoIcons,
  linkDocksArcoVueComponent,
  linkGithubCodeRepository,
  linkGithubRepositoryArcoWebpackPlugin,
  linkGithubRepositoryArcoCli,
  linkDocsDesignStyleGuideline,
  linkSketchResource,
  linkJiShiResource,
  linkArcoMobile,
} from '../../constant/links';
import DesignValues from './components/DesignValues';
import useLocale from '../../hooks/useLocale';
import useIsMobile from '../../utils/useIsMobile';

export default function SectionResource() {
  const locale = useLocale();
  const isMobile = useIsMobile();
  return (
    <Section
      headerProps={{
        title: locale['resource.title'],
        subTitle: locale['resource.subTitle'],
      }}
      addTracker
    >
      <Space size={20} direction={isMobile ? 'vertical' : 'horizontal'}>
        <ResourceCard
          title={locale['resource.design.title']}
          description={locale['resource.design.desc']}
          href={linkDesignerDocs}
          bodyResourceList={[
            {
              name: locale['resource.design.arcoPro'],
              logo: <LogoArcoProBlue />,
              href: linkFigmaArcoPro,
            },
            {
              name: locale['resource.design.jishi'],
              logo: <LogoJiShiBlue />,
              href: linkJiShiResource,
            },
            {
              name: locale['resource.design.sketch'],
              logo: <LogoSketchBlue />,
              href: linkSketchResource,
            },
            {
              name: locale['resource.design.iconBox'],
              logo: <LogoIconBoxBlue />,
              href: linkFigmaArcoIcons,
            },
            {
              name: locale['resource.design.arcoComponent'],
              logo: <LogoFigmaBlue />,
              href: linkFigmaArcoComponent,
            },
            {
              name: locale['resource.design.mobileComponent'],
              logo: <LogoFigmaBlue />,
              href: linkMobileComponent,
            },
          ]}
          footerResourceList={[
            {
              name: locale['resource.design.designPrinciples'],
              href: linkDocsDesignPrinciples,
            },
            {
              name: locale['resource.design.styleGuide'],
              href: linkDocsDesignStyleGuideline,
            },
            {
              name: locale['resource.design.arcoComponentUsage'],
              href: linkDocsComponentUsage,
            },
          ]}
        />
        <ResourceCard
          type="dark"
          title={locale['resource.develop.title']}
          description={locale['resource.develop.desc']}
          href={linkDocsArcoComponent}
          bodyStyle={{ marginTop: 58 }}
          bodyResourceList={[
            {
              name: locale['resource.develop.arcoCli'],
              logo: <LogoArcoCliWhite />,
              href: linkGithubRepositoryArcoCli,
            },
            {
              name: 'Arco Webpack Plugin',
              logo: <LogoArcoWebpackPluginWhite />,
              href: linkGithubRepositoryArcoWebpackPlugin,
            },
            {
              name: locale['resource.develop.github'],
              logo: <LogoGitHubWhite />,
              href: linkGithubCodeRepository,
            },
          ]}
          footerResourceList={[
            {
              name: 'Web React',
              logo: <LogoReact />,
              href: linkDocsArcoComponent,
            },
            {
              name: 'Web Vue',
              logo: <LogoVue />,
              href: linkDocksArcoVueComponent,
            },
            {
              name: 'Mobile React',
              logo: <LogoMobile />,
              href: linkArcoMobile,
            },
          ]}
        />
      </Space>
      <DesignValues style={{ marginTop: 20 }} />
    </Section>
  );
}
