import ListGroupItemAvatar from "./list-group-item-avatar/list-group-item-avatar.component";
import ListGroupItemDefault from "./list-group-item-default/list-group-item-default.component";
import { ListGroupItemExtraAction } from "./list-group-item-extra-action/list-group-item-extra-action.component";

/**
 * Props for ListGroupItem component
 */
type ListGroupItemProps = {
    type: ListGroupItemType;
    label: string;
    value?: string | JSX.Element;
    imageUrl?: string;
    text?: string;
    icon?: string;
    hidden?: boolean;
    onClick?: () => void;
};

/**
 * Enum representing type of ListGroupItem
 */
export enum ListGroupItemType {
    AVATAR,
    DEFAULT,
    EXTRA_ACTION
}

/**
 * Component for rendering ListGroupItem based on type
 * @param {ListGroupItemProps} props - Props for ListGroupItem component
 * @returns {JSX.Element} - Rendered JSX element
 */
export default function ListGroupItem({
    type,
    label,
    value,
    imageUrl,
    text,
    icon,
    hidden,
    onClick
}: ListGroupItemProps) {
    switch (type) {

        case ListGroupItemType.AVATAR:
            return (<>{imageUrl && value &&
                <ListGroupItemAvatar
                    label={label}
                    value={value}
                    imageUrl={imageUrl}
                    onClick={onClick}
                />
            }</>);

        case ListGroupItemType.EXTRA_ACTION:
            return (<>{text && icon &&
                <ListGroupItemExtraAction
                    label={label}
                    text={text}
                    icon={icon}
                    onClick={onClick}
                />
            }</>);

        case ListGroupItemType.DEFAULT:
        default:
            return (<>{value &&
                <ListGroupItemDefault
                    label={label}
                    value={value}
                    hidden={hidden}
                    icon={icon}
                    onClick={onClick} />
            }</>);
    }
}