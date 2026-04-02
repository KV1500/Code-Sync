import Users from "@/components/common/Users"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import useResponsive from "@/hooks/useResponsive"
import { USER_STATUS } from "@/types/user"
import toast from "react-hot-toast"
import { Share2, Copy, LogOut, Users as UsersIcon, Link } from "lucide-react"
import { useNavigate } from "react-router-dom"
import SidebarVideoCall from '../../video/SidebarVideoCall'

function UsersView() {
    const navigate = useNavigate()
    const { viewHeight } = useResponsive()
    const { setStatus } = useAppContext()
    const { socket } = useSocket()

    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL to clipboard")
            console.log(error)
        }
    }

    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } catch (error) {
            toast.error("Unable to share URL")
            console.log(error)
        }
    }

    const leaveRoom = () => {
        socket.disconnect()
        setStatus(USER_STATUS.DISCONNECTED)
        navigate("/", {
            replace: true,
        })
    }

    return (
        <div className="vscode-live-share" style={{ height: viewHeight }}>
            {/* Header */}
            <div className="vscode-live-header">
                <div className="vscode-live-icon-badge">
                    <UsersIcon className="vscode-live-icon" />
                </div>
                <div className="vscode-live-title">
                    <h1>Live Share</h1>
                    <p>Collaborate with your team</p>
                </div>
                <Link className="vscode-live-indicator" />
            </div>
            
            {/* Content */}
            <div className="vscode-live-content">
                {/* Sidebar Video Call Component */}
                <SidebarVideoCall />
                
                {/* List of connected users */}
                <div className="vscode-users-list">
                    <Users />
                </div>
                
                {/* Action Buttons */}
                <div className="vscode-live-actions">
                    {/* Share URL button */}
                    <button
                        className="vscode-live-action-btn primary"
                        onClick={shareURL}
                        title="Share Link"
                    >
                        <Share2 style={{ width: '16px', height: '16px' }} />
                        <span>Share</span>
                    </button>
                    
                    {/* Copy URL button */}
                    <button
                        className="vscode-live-action-btn secondary"
                        onClick={copyURL}
                        title="Copy Link"
                    >
                        <Copy style={{ width: '16px', height: '16px' }} />
                        <span>Copy</span>
                    </button>
                </div>
                
                {/* Leave room button */}
                <button
                    className="vscode-live-leave-btn"
                    onClick={leaveRoom}
                    title="Leave room"
                >
                    <LogOut style={{ width: '16px', height: '16px' }} />
                    <span>Leave Room</span>
                </button>
            </div>
        </div>
    )
}

export default UsersView
