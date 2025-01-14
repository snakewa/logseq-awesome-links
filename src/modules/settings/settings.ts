import { SettingSchemaDesc, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import {
    globalContext,
    toggleFaviconsFeature, toggleIconsFeature, toggleNerdFonFeature
} from '../internal';
import { objectDiff } from '../utils';

import './settings.css';

export const settingsConfig: SettingSchemaDesc[] = [
    {
        key: 'promoAwesomeStyler',
        title: '',
        description: '⚡ Also try "Awesome Styler" theme with lots of UI changes and more features! ⚡ https://github.com/yoyurec/logseq-awesome-styler',
        type: 'boolean',
        default: false,
    },
    {
        key: 'faviconsEnabled',
        title: '',
        description: 'Enable feature: favicons for external links?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'pageIconsEnabled',
        title: '',
        description: 'Enable feature: icon/color for internal pages?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'fixLowContrast',
        title: '',
        description: '⚠ Experimental: Enable text black/white stroke for low contrast page links colors',
        type: 'boolean',
        default: false,
    },
    {
        key: 'inheritFromProp',
        title: '',
        description: 'Inherit page icon/color via custom property page (delete to disable)',
        type: 'string',
        default: 'page-type',
    },
    {
        key: 'inheritFromHierarchy',
        title: '',
        description: 'Inherit page icon/color via hierarchy?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'defaultJournalProps',
        title: '',
        description: 'Journal pages default props: icon (emoji or Nerd icon) and color. (Delete to disable)',
        type: 'string',
        inputAs: 'textarea',
        default: 'icon::\ncolor::',
    },
    {
        key: 'nerdFontEnabled',
        title: '',
        description: 'Enable Nerd font with tons of icons (https://www.nerdfonts.com/cheat-sheet)',
        type: 'boolean',
        default: true,
    },
];

export const settingsLoad = () => {
    logseq.useSettingsSchema(settingsConfig);
    globalContext.pluginConfig = logseq.settings;

    logseq.onSettingsChanged((settings, oldSettings) => {
        onSettingsChangedCallback(settings, oldSettings);
    });
 }

const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    globalContext.pluginConfig = { ...settings };
    const settingsDiff = objectDiff({ ...oldSettings }, globalContext.pluginConfig)
    if (settingsDiff.includes('faviconsEnabled')) {
        toggleFaviconsFeature();
    }
    if (settingsDiff.includes('pageIconsEnabled') || settingsDiff.includes('inheritFromHierarchy') || settingsDiff.includes('defaultJournalProps') || settingsDiff.includes('fixLowContrast')) {
        toggleIconsFeature();
    }
    if (settingsDiff.includes('nerdFontEnabled')) {
        toggleNerdFonFeature();
    }
}
