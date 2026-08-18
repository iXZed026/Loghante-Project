import { cn } from '@/lib/utils/cn'

interface ITicketStatus {
    status: "upcoming" | "progress" | "past"
}

function TicketStatus({
    status,
}: ITicketStatus) {

    function checkTicketStatus(): string {
        if (status === "upcoming") {
            return "text-gold-utility"
        } else if ((status === "progress")) {
            return "text-[#527A8A]"
        } else if ((status === "past")) {
            return "text-crimson"
        }
        return ""
    }

    return (
        <span className={cn(
            "lg:text-sm text-xs font-semibold",
            "text-center",
            "lg:px-3 px-2 py-2",
            "border-2",
            " rounded-lg ",
            checkTicketStatus(),
        )}>
            Upcoming Tickets
        </span>
    )
}

export default TicketStatus