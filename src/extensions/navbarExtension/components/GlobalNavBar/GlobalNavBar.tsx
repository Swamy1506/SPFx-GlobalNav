import * as React from 'react';
import { IGlobalNavBarProps } from './IGlobalNavBarProps';
import { IGlobalNavBarState } from './IGlobalNavBarState';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

import * as SPTermStore from '../../../../components/SPTermStoreService';
import styles from '../../NavbarExtensionApplicationCustomizer.module.scss';

export default class GlobalNavBar extends React.Component<IGlobalNavBarProps, IGlobalNavBarState> {

  /**
  * Main constructor for the component
  */
  constructor(props: IGlobalNavBarProps) {
    super(props);
    this.state = {
    };
  }

  private projectMenuItem(menuItem: SPTermStore.ISPTermObject, itemType: ContextualMenuItemType): IContextualMenuItem {
    return ({
      key: menuItem.identity,
      name: menuItem.name,
      itemType: itemType,
      href: menuItem.terms.length == 0 ?
        (menuItem.localCustomProperties["_Sys_Nav_TargetUrl"] != undefined ?
          menuItem.localCustomProperties["_Sys_Nav_TargetUrl"]
          : null)
        : null,
      subMenuProps: menuItem.terms.length > 0 ?
        { items: menuItem.terms.map((i) => { return (this.projectMenuItem(i, ContextualMenuItemType.Normal)); }) }
        : null,
      isSubMenu: itemType != ContextualMenuItemType.Header,
    });
  }

  public render(): React.ReactElement<IGlobalNavBarProps> {

    const commandBarItems: IContextualMenuItem[] = this.props.menuItems.map((i) => {
      return (this.projectMenuItem(i, ContextualMenuItemType.Header));
    });

    return (
      <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.app}`}>
        <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.top}`}>
          <CommandBar
            className={styles.commandBar}
            items={commandBarItems}
          />
        </div>
      </div>
    );
  }
}
