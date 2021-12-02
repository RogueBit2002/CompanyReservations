export interface IEquipmentErrorProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

export const ButtonDefaultExample: React.FunctionComponent<IEquipmentErrorProps> = props => {
  const { disabled, checked } = props;

  return (
    null
  );
  }