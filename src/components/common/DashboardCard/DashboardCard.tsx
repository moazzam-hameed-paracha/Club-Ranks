import React, { ReactElement } from "react";
import { Card } from "react-bootstrap";
import { IconType } from "react-icons";

type DashboardCardProps = {
  title: string;
  subtitle: string;
  icon: ReactElement<IconType>;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
}) => {
  return (
    <Card className="text-center" style={{ borderRadius: "30px", maxWidth: "250px" }}>
      <Card.Body>
        {icon}
        <Card.Title className="mt-4">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
