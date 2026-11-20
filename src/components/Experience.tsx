import React from "react";
import Card, { type CardProps } from "./card";
import Section from "./Section";

interface ExperienceSectionProps {
  id: string;
  title: string;
  data: CardProps[];
  bgColor?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ id, title, data, bgColor = "bg-white" }) => (
  <Section id={id} title={title} bg={bgColor}>
    {data.map((item, index) => (
      <Card key={index} {...item} />
    ))}
  </Section>
);

export default ExperienceSection;
