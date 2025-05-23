import ProfileUi from "./dashboardComponents/ProfileUi";

export default function HeaderPersonal() {
    return (<div className="flex w-full items-center justify-center p-4 gap-4">
        <div className="h-full flex-1 flex-grow flex items-center justify-start p-[14px] border border-gray-400 rounded-md">
            <p className="p-0 text-[20px] text-slate-500">
                In this moment, nothing is asked of you. You are allowed to pause. To rest. To simply be
            </p>
        </div>
        <div className="h-full flex items-center justify-start p-[14px] lg:p-1 border border-gray-400 rounded-md">
            <ProfileUi />
        </div>
    </div>);
}