/**
 * Props for the Heading component.
 */
interface HeadingProps {
  /**
   * The title of the heading.
   */
  title: string;
  /**
   * The description of the heading.
   */
  description: string;
}

/**
 * A heading component that displays a title and a description.
 * @param {HeadingProps} props - The props for the component.
 * @returns {JSX.Element} The heading component.
 */
export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
