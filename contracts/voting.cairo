%lang starknet

from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.cairo_builtins import HashBuiltin

@storage_var
func vote_map(account : felt) -> (vote : felt):
end

@view
func get_vote{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    account : felt
) -> (vote : felt):
    let (vote) = vote_map.read(account)
    return (vote)
end

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
):
    return ()
end

@external
func cast_vote{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    vote:felt
):
    # Reading caller address
    let (sender_address) = get_caller_address()
    # Writing updated value to storage
    vote_map.write(sender_address, vote)
    return ()
end