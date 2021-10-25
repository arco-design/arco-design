import React from 'react';
import { Link } from '@arco-design/web-react';
import IconDesignLab from '../../assets/logo/logo_DesignLab.svg';
import IconIconBox from '../../assets/logo/logo_IconBox.svg';
import IconArcoPro from '../../assets/logo/logo_ArcoPro.svg';

function getIcon(icon) {
  switch (icon) {
    case 'ArcoPro':
      return <IconArcoPro />;
    case 'DesignLab':
      return <IconDesignLab />;
    case 'IconBox':
    case 'Palette':
      return <IconIconBox />;
    default:
      return icon;
  }
}

function Card(props) {
  const { title, description, link, icon, buttonText } = props;

  return (
    <div className="ac-card">
      <div className="ac-card-content">
        <div className="ac-card-title">
          {getIcon(icon)}
          {title}
        </div>
        <div className="ac-card-description">{description}</div>
      </div>
      <div className="ac-card-link">
        <Link href={link} target="_blank" rel="noreferrer">
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default Card;
