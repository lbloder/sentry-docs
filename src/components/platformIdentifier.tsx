import {getCurrentPlatformOrGuide, getPlatform} from 'sentry-docs/docTree';
import {serverContext} from 'sentry-docs/serverContext';
import {PlatformCaseStyle} from 'sentry-docs/types';

type Props = {
  name: string;
  platform?: string;
};

function formatCaseStyle(style: PlatformCaseStyle | undefined, value: string) {
  switch (style) {
    case 'snake_case':
      return value.replace(/-/g, '_');
    case 'camelCase':
      return value
        .split(/-/g)
        .map((val, idx) =>
          idx === 0 ? val : val.charAt(0).toUpperCase() + val.substring(1)
        )
        .join('');
    case 'PascalCase':
      return value
        .split(/-/g)
        .map(val => val.charAt(0).toUpperCase() + val.substring(1))
        .join('');
    default:
      return value;
  }
}

export function PlatformIdentifier({name, platform}: Props) {
  const {rootNode, path} = serverContext();
  let currentPlatformOrGuide = rootNode && getCurrentPlatformOrGuide(rootNode, path);
  if (!currentPlatformOrGuide && platform) {
    currentPlatformOrGuide = rootNode && getPlatform(rootNode, platform);
  }
  if (!currentPlatformOrGuide) {
    return null;
  }

  return <code>{formatCaseStyle(currentPlatformOrGuide.caseStyle, name)}</code>;
}
