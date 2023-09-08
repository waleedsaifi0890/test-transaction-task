import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  createContext,
} from 'react';
import { isNil, reject, equals } from 'remeda';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

type ContainerContext = {
  toggleActivePanel: (label: string) => void;
  activePanels: string[];
};

type ExpandMode = 'single' | 'multiple';

type ContainerProps = {
  expandMode?: ExpandMode;
  children: JSX.Element[];
};

type PanelProps = {
  children: JSX.Element | JSX.Element[];
  label: string;
  icon?: React.ElementType;
};

const containerContext = createContext<ContainerContext>({
  toggleActivePanel: () => null,
  activePanels: [],
});

const Container = ({ children, expandMode = 'single' }: ContainerProps) => {
  const [activePanels, setActivePanels] = useState<string[]>([]);

  const toggleActivePanel = useCallback(
    (label: string) => {
      if (expandMode === 'single') {
        setActivePanels(activePanels.includes(label) ? [] : [label]);
      }

      if (expandMode === 'multiple') {
        setActivePanels(
          activePanels.includes(label)
            ? reject(activePanels, equals(label))
            : [...activePanels, label]
        );
      }
    },
    [activePanels, expandMode]
  );

  const context = useMemo(
    () => ({
      toggleActivePanel,
      activePanels,
    }),
    [toggleActivePanel, activePanels]
  );

  return (
    <section className="space-y-3">
      <containerContext.Provider value={context}>
        {children}
      </containerContext.Provider>
    </section>
  );
};

const generatePanelButtonClasses = (isActive: boolean) => `
	flex
	w-full
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

const Panel = ({ children, label, icon: Icon }: PanelProps) => {
  const { toggleActivePanel, activePanels } = useContext(containerContext);

  const togglePanel = useCallback(() => {
    toggleActivePanel(label);
  }, [toggleActivePanel, label]);

  const isActive = useMemo(
    () => activePanels.includes(label),
    [activePanels, label]
  );

  const classes = useMemo(
    () => ({
      button: generatePanelButtonClasses(isActive),
    }),
    [isActive]
  );

  return (
    <article>
      <header>
        <button
          key={label}
          className={classes.button}
          type="button"
          onClick={togglePanel}
        >
          {!isNil(Icon) && <Icon className="w-5" />}
          <span>{label}</span>
          {isActive && <ChevronUpIcon className="!ml-auto w-5" />}
          {!isActive && <ChevronDownIcon className="!ml-auto w-5" />}
        </button>
      </header>
      <div className="mt-4">{isActive && children}</div>
    </article>
  );
};

const Accordion = {
  Container,
  Panel,
};

export default Accordion;

export type { ContainerContext, ExpandMode, ContainerProps, PanelProps };
