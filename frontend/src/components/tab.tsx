import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  createContext,
} from 'react';
import { isNil } from 'remeda';

type ContainerContext = {
  registerPanel: (label: string, icon?: React.ElementType) => void;
  activePanel: string | undefined;
};

type RegisteredPanel = {
  label: string;
  icon?: React.ElementType;
};

type ContainerState = {
  registeredPanels: RegisteredPanel[];
  activePanel?: string;
};

type ContainerProps = {
  children: JSX.Element[];
};

type PanelProps = {
  children: JSX.Element | JSX.Element[];
  label: string;
  icon?: React.ElementType;
};

const containerContext = createContext<ContainerContext>({
  registerPanel: () => null,
  activePanel: undefined,
});

const generateContainerButtonClasses = (isActive: boolean) => `
	flex
	items-center
	space-x-2
	flex-grow
	text-left
	subheading
	py-2
	border-b-2
	${isActive ? 'border-true-gray-400' : 'border-true-gray-200'}
	${isActive ? '' : 'text-true-gray-400'}
`;

const Container = ({ children }: ContainerProps) => {
  const [state, setState] = useState<ContainerState>({
    registeredPanels: [],
    activePanel: undefined,
  });

  const registerPanel = useCallback(
    (label: string, icon?: React.ElementType) => {
      setState((current) => ({
        activePanel: current.registeredPanels[0]?.label ?? label,
        registeredPanels: [...current.registeredPanels, { label, icon }],
      }));
    },
    []
  );

  const setActivePanel = useCallback(
    (label: string) => () => {
      setState((current) => ({
        ...current,
        activePanel: label,
      }));
    },
    []
  );

  const context = useMemo(
    () => ({
      registerPanel,
      activePanel: state.activePanel,
    }),
    [registerPanel, state.activePanel]
  );

  const panelButtons = useMemo(
    () =>
      state.registeredPanels.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className={generateContainerButtonClasses(
            state.activePanel === label
          )}
          type="button"
          onClick={setActivePanel(label)}
        >
          {!isNil(Icon) && <Icon className="w-5" />}
          <span>{label}</span>
        </button>
      )),
    [setActivePanel, state.activePanel, state.registeredPanels]
  );

  return (
    <section>
      <header className="flex items-center">{panelButtons}</header>
      <containerContext.Provider value={context}>
        {children}
      </containerContext.Provider>
    </section>
  );
};

const Panel = ({ children, label, icon }: PanelProps) => {
  const { registerPanel, activePanel } = useContext(containerContext);

  useEffect(() => {
    registerPanel(label, icon);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (activePanel !== label) {
    return null;
  }

  return <article className="mt-4">{children}</article>;
};

const Tab = {
  Container,
  Panel,
};

export default Tab;

export type {
  ContainerContext,
  RegisteredPanel,
  ContainerState,
  ContainerProps,
  PanelProps,
};
