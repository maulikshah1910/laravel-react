import DashboardLayout from "@/layouts/DashboardLayout";

const PanelLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
};

export default PanelLayout;